'use client';

import Link from '@/components/navigation-link';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowLeft,ArrowRight,Bookmark,Check,CheckCircle2,ChevronRight,Clock3,Download,FileText,GraduationCap,Lightbulb,List,Minus,Plus,Search,Upload} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card,CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Progress} from '@/components/ui/progress';
import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';
import {courses,topics,resources,getCourseTopics} from '@/lib/data';
import {useLearning} from '@/lib/store';
import './learning.css';

function Highlight({text,query}:{text:string;query:string}){
  const needle=query.trim().toLowerCase();
  if(!needle)return <>{text}</>;
  const parts:ReactNode[]=[];
  let offset=0,at=text.toLowerCase().indexOf(needle);
  while(at>=0){parts.push(text.slice(offset,at),<mark key={at}>{text.slice(at,at+needle.length)}</mark>);offset=at+needle.length;at=text.toLowerCase().indexOf(needle,offset)}
  parts.push(text.slice(offset));return <>{parts}</>;
}

export function UnitReaderView({reportIssue}:{reportIssue?:(resource:string)=>ReactNode}){
  const{state,ready,setLastTopic,toggleBookmark,completeTopic,setNotice}=useLearning();
  const[topicId,setTopicId]=useState(topics[0].id);
  const[query,setQuery]=useState('');
  const[size,setSize]=useState(17);
  const[sepia,setSepia]=useState(false);
  const[tocOpen,setTocOpen]=useState(true);
  const[tab,setTab]=useState('notes');
  const[readPercent,setReadPercent]=useState(0);
  const[selectedPdfId,setSelectedPdfId]=useState('');
  const[localPdf,setLocalPdf]=useState<{url:string;title:string}|null>(null);
  const articleRef=useRef<HTMLElement>(null);
  const initialized=useRef(false);
  const localPdfUrl=useRef<string|null>(null);
  const topic=topics.find(t=>t.id===topicId)||topics[0];
  const course=courses.find(c=>c.id===topic.courseId)||courses[0];
  const courseTopics=getCourseTopics(course.id);
  const index=courseTopics.findIndex(t=>t.id===topic.id);
  const courseResources=resources.filter(r=>r.courseId===course.id);
  const pdfs=courseResources.filter(r=>r.format.toLowerCase()==='pdf');
  const selectedPdf=pdfs.find(r=>r.id===selectedPdfId)||pdfs[0];
  const activePdf=localPdf||selectedPdf;
  const sourceMatches=courseResources.filter(r=>topic.sources.includes(r.id)||topic.sources.includes(r.title));
  const topicSources=sourceMatches.length?sourceMatches:courseResources;
  const completed=courseTopics.filter(t=>state.completed.includes(t.id)).length;
  const done=state.completed.includes(topic.id);
  const saved=state.bookmarks.includes(topic.id);
  const searchable=[topic.title,...topic.objectives,...topic.sections.flatMap(s=>[s.heading,s.text]),topic.takeaway].join(' ').toLowerCase();
  const needle=query.trim().toLowerCase();
  const count=needle?searchable.split(needle).length-1:0;

  useEffect(()=>{
    if(!ready)return;
    function syncLocation(){
      const params=new URLSearchParams(window.location.search);
      const requested=topics.find(t=>t.id===params.get('topic'));
      const requestedUnit=courses.find(c=>c.id===params.get('unit'));
      const resume=topics.find(t=>t.id===state.lastTopic);
      const next=requested||(requestedUnit?getCourseTopics(requestedUnit.id)[0]:resume)||topics[0];
      setTopicId(next.id);setLastTopic(next.id);setQuery('');setReadPercent(0);setTab('notes');setLocalPdf(null);setSelectedPdfId('');
      if(localPdfUrl.current){URL.revokeObjectURL(localPdfUrl.current);localPdfUrl.current=null}
    }
    if(!initialized.current){
      initialized.current=true;
      setTocOpen(!window.matchMedia('(max-width:767px)').matches);
      syncLocation();
      try{const prefs=JSON.parse(localStorage.getItem('masomo-reader-preferences')||'{}');if(typeof prefs.size==='number')setSize(Math.max(15,Math.min(23,prefs.size)));if(prefs.sepia)setSepia(true)}catch{}
    }
    window.addEventListener('popstate',syncLocation);
    return()=>window.removeEventListener('popstate',syncLocation);
  },[ready,state.lastTopic]);

  useEffect(()=>{
    if(!ready||!initialized.current||tab!=='notes')return;
    let offset=0,restoring=true,ticking=false;
    try{const value=Number(localStorage.getItem('masomo-reading-'+topic.id)||0);if(Number.isFinite(value)&&value>0)offset=value}catch{}
    const measure=()=>{const article=articleRef.current;if(article){const available=article.offsetHeight-window.innerHeight;setReadPercent(available>0?Math.min(100,Math.max(0,Math.round((window.scrollY-article.offsetTop)/available*100))):100)}};
    const timer=setTimeout(()=>{window.scrollTo({top:offset,behavior:'instant'});restoring=false;measure()},100);
    const onScroll=()=>{if(ticking||restoring)return;ticking=true;requestAnimationFrame(()=>{measure();try{localStorage.setItem('masomo-reading-'+topic.id,String(window.scrollY))}catch{}ticking=false})};
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{clearTimeout(timer);window.removeEventListener('scroll',onScroll)};
  },[topic.id,ready,tab]);

  useEffect(()=>{if(initialized.current)try{localStorage.setItem('masomo-reader-preferences',JSON.stringify({size,sepia}))}catch{}},[size,sepia]);
  useEffect(()=>()=>{if(localPdfUrl.current)URL.revokeObjectURL(localPdfUrl.current)},[]);

  function navigate(id:string){
    if(!topics.some(t=>t.id===id))return;
    setTopicId(id);setLastTopic(id);setQuery('');setReadPercent(0);setTab('notes');setLocalPdf(null);setSelectedPdfId('');
    if(localPdfUrl.current){URL.revokeObjectURL(localPdfUrl.current);localPdfUrl.current=null}
    if(window.matchMedia('(max-width:767px)').matches)setTocOpen(false);
    window.history.pushState(null,'',`?topic=${encodeURIComponent(id)}`);
    window.scrollTo({top:0,behavior:'instant'});
  }
  function download(){
    const body=[topic.title,`${course.code} · ${course.title}`,'Year 3 · Semester 1','LEARNING OBJECTIVES',...topic.objectives.map((objective,i)=>`${i+1}. ${objective}`),...topic.sections.flatMap((s,i)=>[`${i+1}. ${s.heading}`,s.text]),'KEY TAKEAWAY',topic.takeaway,'SOURCE MATERIALS',...topicSources.map(r=>`${r.title}: ${window.location.origin}${r.url}`)].join('\n\n');
    const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download=`${topic.id}-notes.txt`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('Your topic notes have been downloaded.');
  }
  function openPdf(event:React.ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];if(!file)return;
    if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')){setNotice('Please choose a PDF document.');return}
    if(file.size>25*1024*1024){setNotice('Please choose a PDF smaller than 25 MB.');return}
    if(localPdfUrl.current)URL.revokeObjectURL(localPdfUrl.current);
    const url=URL.createObjectURL(file);localPdfUrl.current=url;setLocalPdf({url,title:file.name});setTab('pdf');
  }

  return <div className="learning-view">
    <div className="learning-breadcrumb"><Link href="/courses/">My courses</Link><ChevronRight size={13}/><Link href={`/courses/?unit=${course.id}`}>{course.code}</Link><ChevronRight size={13}/><span>Learning space</span></div>
    <div className="page-heading reader-page-heading"><div><p className="eyebrow">YEAR 3 · SEMESTER 1</p><h1>{course.title}</h1><p className="muted">Structured topic notes <span className="reader-meta-dot">·</span> Learn at your pace</p></div><Button asChild variant="outline"><Link href={`/courses/?unit=${course.id}`}>View unit<ArrowRight size={16}/></Link></Button></div>
    <div className="reader-unit-switch"><label htmlFor="reader-unit">Your semester units</label><select id="reader-unit" value={course.id} onChange={event=>{const first=getCourseTopics(event.target.value)[0];if(first)navigate(first.id)}}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.title}</option>)}</select><span>{courseTopics.length} topics · {courseResources.length} source files</span></div>
    <div className="reader-layout">
      <aside className="reader-toc panel"><details open={tocOpen} onToggle={event=>setTocOpen(event.currentTarget.open)}><summary><List size={18}/><strong>Unit contents</strong><span>{completed}/{courseTopics.length}</span><ChevronRight size={14} className="toc-chevron"/></summary><div className="reader-toc-body"><p className="muted">{courseTopics.length} topics · Year 3, Semester 1</p><Progress aria-label={`Completed topics in ${course.title}`} value={completed/courseTopics.length*100}/><nav aria-label="Topic navigation">{courseTopics.map((t,i)=><button key={t.id} className={`toc-topic ${t.id===topic.id?'active':''}`} onClick={()=>navigate(t.id)} aria-current={t.id===topic.id?'page':undefined}><span className={`toc-number ${state.completed.includes(t.id)?'complete':''}`}>{state.completed.includes(t.id)?<Check size={14}/>:String(i+1).padStart(2,'0')}</span><span>{t.title}<small>{t.minutes} min read</small></span>{t.id===topic.id&&<ChevronRight size={15}/>}</button>)}</nav><div className="toc-footer"><Lightbulb size={18}/><p>Small steps add up.<br/><strong>One topic at a time.</strong></p></div></div></details></aside>
      <div className="reader-main"><Tabs value={tab} onValueChange={setTab}>
        <div className="reader-toolbar panel"><TabsList aria-label="Reading format"><TabsTrigger value="notes"><FileText size={15}/>Topic notes</TabsTrigger><TabsTrigger value="pdf">Source PDFs</TabsTrigger></TabsList><div className="reader-tools"><Button size="icon" variant="ghost" onClick={()=>toggleBookmark(topic.id)} aria-label={saved?'Remove bookmark':'Bookmark topic'} aria-pressed={saved}><Bookmark size={18} fill={saved?'currentColor':'none'}/></Button><Button size="icon" variant="ghost" onClick={download} aria-label="Download topic notes"><Download size={18}/></Button></div></div>
        <TabsContent value="notes">
          <div className="reading-controls"><div className="reader-find"><Search size={15}/><Input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find in this topic…" aria-label="Find within topic"/>{query&&<small aria-live="polite">{count} found</small>}</div><div className="reader-appearance"><Button variant="ghost" size="icon" onClick={()=>setSize(value=>Math.max(15,value-1))} disabled={size<=15} aria-label="Decrease text size"><Minus size={14}/></Button><span aria-label={`Text size ${size} pixels`}>Aa</span><Button variant="ghost" size="icon" onClick={()=>setSize(value=>Math.min(23,value+1))} disabled={size>=23} aria-label="Increase text size"><Plus size={14}/></Button><button className={`reader-theme ${sepia?'selected':''}`} aria-label="Warm reading background" aria-pressed={sepia} onClick={()=>setSepia(value=>!value)}>◐</button></div></div>
          <article ref={articleRef} className={`reader-article panel ${sepia?'sepia':''}`} style={{fontSize:size}}>
            <div className="article-kicker"><span>TOPIC {String(index+1).padStart(2,'0')}</span><span><Clock3 size={14}/>{topic.minutes} min read</span></div>
            <h2><Highlight text={topic.title} query={query}/></h2><p className="article-intro">{course.code} · Year 3 · Semester 1</p>
            <div className="reader-objectives"><h3><GraduationCap size={19}/>Learning objectives</h3><p>By the end of this topic, you should be able to:</p><ul>{topic.objectives.map(objective=><li key={objective}><Highlight text={objective} query={query}/></li>)}</ul></div>
            <div className="article-divider"/>{topic.sections.map((section,i)=><section key={`${i}-${section.heading}`}><h3><span className="reader-section-number">{index+1}.{i+1}</span><Highlight text={section.heading} query={query}/></h3><p className="reader-section-text"><Highlight text={section.text} query={query}/></p></section>)}
            <div className="reading-takeaway"><Lightbulb size={22}/><div><strong>Key takeaway</strong><p><Highlight text={topic.takeaway} query={query}/></p></div></div>
            <div className="reader-source-list"><h3><FileText size={17}/>Source materials</h3><p>Read the supplied lecture material for the full explanations, diagrams, and exercises.</p>{topicSources.map(resource=><a key={resource.id} href={resource.url} target="_blank" rel="noreferrer"><span>{resource.title}</span><small>{resource.format.toUpperCase()}</small><ArrowRight size={14}/></a>)}</div>
            <div className="reading-complete"><div><strong>{done?'You’ve completed this topic':'Feeling confident with this topic?'}</strong><p className="muted">Mark your progress and continue through your unit.</p></div><Button onClick={()=>completeTopic(topic.id)} disabled={done}><CheckCircle2 size={16}/>{done?'Completed':'Mark as complete'}</Button></div>{reportIssue?.(topic.title)}
          </article>
          <div className="reader-pagination"><Button variant="outline" disabled={index<=0} onClick={()=>navigate(courseTopics[index-1].id)}><ArrowLeft size={15}/>Previous topic</Button><span>{index+1} of {courseTopics.length}</span><Button variant="outline" disabled={index>=courseTopics.length-1} onClick={()=>navigate(courseTopics[index+1].id)}>Next topic<ArrowRight size={15}/></Button></div>
          <div className="reader-quiz-cta panel"><div className="quiz-cta-icon">{topic.id==='stacks'?<GraduationCap size={27}/>:<FileText size={25}/>}</div><div><h3>{topic.id==='stacks'?'A little practice goes a long way.':'Keep your lecture materials close.'}</h3><p className="muted">{topic.id==='stacks'?'Check your understanding with 5 quick questions on stacks and queues.':`Explore the source documents and topics for ${course.title}.`}</p></div><Button asChild><Link href={topic.id==='stacks'?'/quizzes/?start=stacks':`/library/?unit=${course.id}`}>{topic.id==='stacks'?'Try the topic quiz':'Open unit library'}<ArrowRight size={16}/></Link></Button></div>
          <div className="reader-progress-note"><CheckCircle2 size={14}/>{done?'Topic completed':`${readPercent}% through this reading`}<span>· Your place is saved in this browser</span></div>
        </TabsContent>
        <TabsContent value="pdf"><Card className="pdf-panel"><CardContent><div className="pdf-heading"><div><h2>Your unit’s source PDFs</h2><p className="muted">Read the supplied lecture files alongside your structured topic notes.</p></div><label className="pdf-upload-button"><Upload size={16}/>Open local PDF<input type="file" accept="application/pdf,.pdf" onChange={openPdf}/></label></div>
          {pdfs.length>0&&<div className="reader-pdf-picker"><label htmlFor="reader-source-pdf">Choose a source PDF</label><select id="reader-source-pdf" value={localPdf?'local':selectedPdf?.id||''} onChange={event=>{setSelectedPdfId(event.target.value);setLocalPdf(null)}}>{localPdf&&<option value="local">{localPdf.title} (local file)</option>}{pdfs.map(resource=><option key={resource.id} value={resource.id}>{resource.title}</option>)}</select></div>}
          {activePdf?<><div className="pdf-filename"><FileText size={15}/>{activePdf.title}<a href={activePdf.url} download><Download size={15}/>Download</a></div><object key={activePdf.url} data={activePdf.url} type="application/pdf" className="pdf-document" aria-label={`PDF document: ${activePdf.title}`}><p>Your browser cannot display this PDF inline. <a href={activePdf.url} target="_blank" rel="noreferrer">Open the document in a new tab</a>.</p></object><p className="pdf-help muted">Use your browser’s PDF controls to search, zoom, and navigate pages.</p><a className="pdf-newtab" href={activePdf.url} target="_blank" rel="noreferrer">Open PDF in a new tab<ArrowRight size={14}/></a></>:<div className="pdf-empty"><div><FileText size={38}/></div><h3>This unit’s materials are lecture documents.</h3><p>Open or download the Word and PowerPoint source files below, or choose a PDF from your device.</p></div>}
          {courseResources.some(resource=>resource.format.toLowerCase()!=='pdf')&&<div className="reader-source-list reader-other-files"><h3>Other lecture files</h3>{courseResources.filter(resource=>resource.format.toLowerCase()!=='pdf').map(resource=><a key={resource.id} href={resource.url} download><span>{resource.title}</span><small>{resource.format.toUpperCase()}</small><Download size={14}/></a>)}</div>}
        </CardContent></Card></TabsContent>
      </Tabs></div>
    </div>
  </div>;
}
