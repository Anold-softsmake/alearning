-- OPTIONAL authored sample curriculum. Run after schema.sql and creating an admin.
-- This does not import university records, create accounts, or enrol students.
-- Generated UUIDs are returned by the database; no fake user IDs are required.
-- Safe to repeat: existing matching sample rows are retained, never overwritten.
begin;
do $$
declare
  v_admin uuid; v_university uuid; v_faculty uuid; v_programme uuid;
  v_year uuid; v_semester uuid; v_unit uuid; v_topic uuid; v_resource uuid;
  v_submission uuid; v_quiz uuid; v_question uuid; item record;
begin
  select user_id into v_admin from public.user_roles where role='administrator' order by granted_at limit 1;
  if v_admin is null then
    raise exception 'Create an Auth account and grant it the administrator role before running the optional sample seed.';
  end if;

  insert into public.universities(name,slug,country) values('Sample University','inclusive-sample-university','Kenya')
    on conflict(slug) do nothing;
  select id into v_university from public.universities where slug='inclusive-sample-university';
  insert into public.faculties(university_id,name) values(v_university,'School of Computing · Sample')
    on conflict(university_id,name) do nothing;
  select id into v_faculty from public.faculties where university_id=v_university and name='School of Computing · Sample';
  insert into public.programmes(faculty_id,name,code) values(v_faculty,'Bachelor of Science in Computer Science · Sample','DEMO-CS')
    on conflict(faculty_id,code) do nothing;
  select id into v_programme from public.programmes where faculty_id=v_faculty and code='DEMO-CS';
  insert into public.academic_years(programme_id,year_of_study,label) values(v_programme,3,'Sample academic year')
    on conflict(programme_id,year_of_study,label) do nothing;
  select id into v_year from public.academic_years where programme_id=v_programme and year_of_study=3 and label='Sample academic year';
  insert into public.semesters(academic_year_id,number) values(v_year,1)
    on conflict(academic_year_id,number) do nothing;
  select id into v_semester from public.semesters where academic_year_id=v_year and number=1;

  for item in select * from (values
    ('SCS 301','Data Structures & Algorithms','Explore efficient ways to organize and process information.'),
    ('SCS 303','Database Management Systems','Explore relational data, SQL, and database design.'),
    ('SCS 305','Computer Networks','Explore how computers exchange information.'),
    ('SCS 307','Software Engineering','Explore how teams develop maintainable software.'),
    ('SMA 301','Probability & Statistics','Explore probability and reasoning with data.'),
    ('SCS 309','Operating Systems','Explore processes, memory, and file systems.')
  ) as samples(code,title,description) loop
    insert into public.units(semester_id,code,title,description) values(v_semester,item.code,item.title,item.description)
      on conflict(semester_id,code) do nothing;
  end loop;
  select id into v_unit from public.units where semester_id=v_semester and code='SCS 301';

  for item in select * from (values
    (1,'Introduction to data structures','A data structure organizes information so that a program can access and modify it efficiently. Choose a structure by comparing the operations your program needs: access, search, insertion, and deletion. Arrays, linked lists, stacks, queues, trees, and graphs provide different trade-offs.'),
    (2,'Arrays and linked lists','Arrays store elements consecutively and support constant-time indexed access. Inserting into the middle may require shifting elements. A linked list stores nodes connected by references. It can support efficient insertion at a known position, while searching takes linear time in the worst case.'),
    (3,'Stacks and queues','A stack follows Last In, First Out (LIFO). Push adds an item, pop removes the top item, and peek reads the top without removing it. A queue follows First In, First Out (FIFO). Enqueue adds at the back and dequeue removes from the front. Stacks suit undo operations; queues suit tasks waiting to be processed.'),
    (4,'Trees and binary search trees','A tree represents a hierarchy using nodes and edges. A binary search tree places smaller values in the left subtree and larger values in the right subtree. A balanced search tree supports logarithmic search. An unbalanced tree can require linear search. In-order traversal produces sorted values.'),
    (5,'Graphs and traversal','A graph represents relationships through vertices and edges. Breadth-first search uses a queue to explore level by level. It finds paths with the fewest edges in an unweighted graph. Depth-first search explores a path before backtracking, using recursion or an explicit stack.'),
    (6,'Sorting and searching','Sorting puts values into a defined order. Merge sort provides O(n log n) time; insertion sort can be useful on small or nearly sorted inputs. Binary search repeatedly halves a sorted search space and takes O(log n) time. Consider memory, input size, and existing order when selecting an algorithm.')
  ) as samples(position,title,body) loop
    insert into public.topics(unit_id,title,position,summary) values(v_unit,item.title,item.position,'Authored demonstration learning material.')
      on conflict(unit_id,position) do nothing;
    select id into v_topic from public.topics where unit_id=v_unit and position=item.position;
    v_resource := null;
    insert into public.learning_resources(topic_id,author_id,title,kind,body,status)
      select v_topic,v_admin,item.title || ' · Sample notes','notes',item.body,'approved'
      where not exists(select 1 from public.learning_resources where topic_id=v_topic and title=item.title || ' · Sample notes')
      returning id into v_resource;
    if v_resource is not null then
      insert into public.content_submissions(contributor_id,resource_id,status) values(v_admin,v_resource,'approved') returning id into v_submission;
      insert into public.content_approvals(submission_id,reviewer_id,approved,feedback)
        values(v_submission,v_admin,true,'Initial authored sample curriculum, installed by a trusted database administrator.');
    end if;
  end loop;

  select id into v_topic from public.topics where unit_id=v_unit and position=3;
  if not exists(select 1 from public.quizzes where topic_id=v_topic and title='Stacks & queues · Sample practice') then
    insert into public.quizzes(topic_id,author_id,title,description,status,max_attempts)
      values(v_topic,v_admin,'Stacks & queues · Sample practice','A short authored practice quiz. Unlimited retakes.','approved',null) returning id into v_quiz;
    insert into public.questions(quiz_id,kind,prompt,options,position)
      values(v_quiz,'multiple_choice','Which principle does a stack follow?', '["FIFO","LIFO","Random access","Priority ordering"]',1) returning id into v_question;
    insert into public.answers(question_id,accepted_answers,explanation) values(v_question,array['LIFO'],'A stack removes the most recently added item first.');
    insert into public.questions(quiz_id,kind,prompt,options,position)
      values(v_quiz,'true_false','A queue removes the element that was added first.','["true","false"]',2) returning id into v_question;
    insert into public.answers(question_id,accepted_answers,explanation) values(v_question,array['true'],'Queues follow First In, First Out.');
    insert into public.questions(quiz_id,kind,prompt,options,position)
      values(v_quiz,'multiple_choice','What is the typical complexity of push when storage capacity is available?','["O(n)","O(log n)","O(1)","O(n²)"]',3) returning id into v_question;
    insert into public.answers(question_id,accepted_answers,explanation) values(v_question,array['O(1)'],'Adding one element to the top takes constant time when no resizing is required.');
    insert into public.questions(quiz_id,kind,prompt,position)
      values(v_quiz,'short_answer','Which stack operation removes the top element?',4) returning id into v_question;
    insert into public.answers(question_id,accepted_answers,explanation) values(v_question,array['pop'],'Pop removes the top element from a stack.');
    insert into public.questions(quiz_id,kind,prompt,options,position)
      values(v_quiz,'multiple_choice','Which structure suits an undo action?','["Queue","Stack","Graph","Set"]',5) returning id into v_question;
    insert into public.answers(question_id,accepted_answers,explanation) values(v_question,array['Stack'],'Undo reverses the most recent action, matching a stack.');
    insert into public.content_submissions(contributor_id,quiz_id,status) values(v_admin,v_quiz,'approved') returning id into v_submission;
    insert into public.content_approvals(submission_id,reviewer_id,approved,feedback)
      values(v_submission,v_admin,true,'Initial authored sample quiz, installed by a trusted database administrator.');
  end if;
end $$;
commit;
