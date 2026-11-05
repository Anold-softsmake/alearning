-- Inclusive University System · PostgreSQL / Supabase initial schema.
-- Run once in a new Supabase project's SQL editor as the database owner.
-- The browser must use the public anon key; never expose the service_role key.
begin;

create extension if not exists pgcrypto;
create type public.app_role as enum ('student', 'lecturer', 'contributor', 'administrator');
create type public.content_status as enum ('draft', 'pending', 'approved', 'rejected', 'archived');
create type public.question_type as enum ('multiple_choice', 'true_false', 'short_answer');

create table public.universities (
  id uuid primary key default gen_random_uuid(), name text not null check (length(trim(name)) > 1),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'), country text not null default 'Kenya', created_at timestamptz not null default now()
);
create table public.faculties (
  id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete restrict,
  name text not null, unique (university_id, name)
);
create table public.programmes (
  id uuid primary key default gen_random_uuid(), faculty_id uuid not null references public.faculties(id) on delete restrict,
  name text not null, code text not null, duration_years smallint not null default 4 check (duration_years between 1 and 10), unique (faculty_id, code)
);
create table public.academic_years (
  id uuid primary key default gen_random_uuid(), programme_id uuid not null references public.programmes(id) on delete restrict,
  year_of_study smallint not null check (year_of_study between 1 and 10), label text not null, unique (programme_id, year_of_study, label)
);
create table public.semesters (
  id uuid primary key default gen_random_uuid(), academic_year_id uuid not null references public.academic_years(id) on delete restrict,
  number smallint not null check (number between 1 and 3), starts_on date, ends_on date,
  check (ends_on is null or starts_on is null or ends_on >= starts_on), unique (academic_year_id, number)
);
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade, display_name text not null default 'Student' check (length(display_name) between 1 and 120),
  university_id uuid references public.universities(id), programme_id uuid references public.programmes(id),
  academic_year_id uuid references public.academic_years(id), semester_id uuid references public.semesters(id),
  accessibility_preferences jsonb not null default '{}'::jsonb check (jsonb_typeof(accessibility_preferences) = 'object'),
  created_at timestamptz not null default now()
);
create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade, role public.app_role not null default 'student',
  granted_at timestamptz not null default now(), granted_by uuid references public.profiles(id), primary key (user_id, role)
);
create function public.has_role(p_role public.app_role) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = p_role);
$$;
create function public.can_contribute() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('lecturer', 'contributor', 'administrator'));
$$;
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, display_name) values(new.id, left(coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), 'Student'),120));
  insert into public.user_roles(user_id, role) values(new.id, 'student');
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.units (
  id uuid primary key default gen_random_uuid(), semester_id uuid not null references public.semesters(id) on delete restrict,
  code text not null, title text not null check (length(trim(title)) > 1), description text not null default '',
  lecturer_id uuid references public.profiles(id), credits smallint not null default 3 check(credits > 0), unique (semester_id, code)
);
create table public.enrolments (
  student_id uuid not null references public.profiles(id) on delete cascade, unit_id uuid not null references public.units(id) on delete cascade,
  enrolled_at timestamptz not null default now(), primary key(student_id, unit_id)
);
create table public.topics (
  id uuid primary key default gen_random_uuid(), unit_id uuid not null references public.units(id) on delete restrict,
  title text not null, position integer not null check (position >= 0), summary text not null default '', unique (unit_id, position)
);
create table public.learning_resources (
  id uuid primary key default gen_random_uuid(), topic_id uuid not null references public.topics(id) on delete restrict,
  author_id uuid not null default auth.uid() references public.profiles(id), title text not null check(length(trim(title)) > 1),
  kind text not null check(kind in ('notes', 'pdf', 'document', 'video', 'link')), body text,
  storage_path text unique, external_url text check(external_url is null or external_url ~ '^https://'),
  captions_path text, download_allowed boolean not null default true, status public.content_status not null default 'draft',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check(status not in ('pending','approved') or
    (kind = 'notes' and length(trim(coalesce(body,''))) > 0) or
    (kind in ('pdf','document') and (storage_path is not null or external_url is not null)) or
    (kind in ('video','link') and external_url is not null))
);
create table public.quizzes (
  id uuid primary key default gen_random_uuid(), topic_id uuid not null references public.topics(id) on delete restrict,
  author_id uuid not null default auth.uid() references public.profiles(id), title text not null, description text not null default '',
  status public.content_status not null default 'draft', max_attempts integer check(max_attempts is null or max_attempts > 0),
  pass_percent numeric(5,2) not null default 60 check(pass_percent between 0 and 100), created_at timestamptz not null default now()
);
create table public.questions (
  id uuid primary key default gen_random_uuid(), quiz_id uuid not null references public.quizzes(id) on delete cascade,
  kind public.question_type not null, prompt text not null check(length(trim(prompt)) > 0),
  options jsonb not null default '[]'::jsonb check(jsonb_typeof(options) = 'array'),
  points integer not null default 1 check(points > 0), position integer not null check(position >= 0), unique(quiz_id, position)
);
-- Answer keys have NO student SELECT policy. Marking runs only inside submit_quiz.
create table public.answers (
  question_id uuid primary key references public.questions(id) on delete cascade,
  accepted_answers text[] not null check(cardinality(accepted_answers) > 0), explanation text not null default ''
);
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete restrict, score numeric(5,2) not null check(score between 0 and 100),
  earned_points integer not null check(earned_points >= 0), total_points integer not null check(total_points > 0),
  feedback jsonb not null, completed_at timestamptz not null default now()
);
create table public.student_progress (
  student_id uuid not null references public.profiles(id) on delete cascade, topic_id uuid not null references public.topics(id) on delete cascade,
  percent numeric(5,2) not null default 0 check(percent between 0 and 100), completed boolean not null default false,
  last_read_at timestamptz not null default now(), primary key(student_id, topic_id), check(not completed or percent = 100)
);
create table public.bookmarks (
  student_id uuid not null references public.profiles(id) on delete cascade, topic_id uuid not null references public.topics(id) on delete cascade,
  created_at timestamptz not null default now(), primary key(student_id, topic_id)
);
create table public.content_submissions (
  id uuid primary key default gen_random_uuid(), contributor_id uuid not null default auth.uid() references public.profiles(id),
  resource_id uuid references public.learning_resources(id) on delete cascade, quiz_id uuid references public.quizzes(id) on delete cascade,
  status public.content_status not null default 'pending' check(status in ('pending','approved','rejected')),
  submitted_at timestamptz not null default now(), check(num_nonnulls(resource_id, quiz_id) = 1)
);
create unique index one_pending_resource_submission on public.content_submissions(resource_id) where status = 'pending';
create unique index one_pending_quiz_submission on public.content_submissions(quiz_id) where status = 'pending';
create table public.content_approvals (
  id uuid primary key default gen_random_uuid(), submission_id uuid not null unique references public.content_submissions(id),
  reviewer_id uuid not null references public.profiles(id), approved boolean not null, feedback text not null default '', reviewed_at timestamptz not null default now()
);
create table public.material_reports (
  id uuid primary key default gen_random_uuid(), resource_id uuid not null references public.learning_resources(id),
  reported_by uuid not null default auth.uid() references public.profiles(id), reason text not null check(length(trim(reason)) between 10 and 3000),
  status text not null default 'open' check(status in ('open','resolved','dismissed')), resolution text,
  created_at timestamptz not null default now()
);
create table public.notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null, body text not null, read_at timestamptz, created_at timestamptz not null default now()
);
create table public.assignments (
  id uuid primary key default gen_random_uuid(), unit_id uuid not null references public.units(id), title text not null,
  description text not null default '', due_at timestamptz not null, created_by uuid not null default auth.uid() references public.profiles(id)
);
create table public.activity_events (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references public.profiles(id),
  kind text not null, description text not null, created_at timestamptz not null default now()
);

-- All application tables use row-level security. Table grants do not bypass it.
do $$ declare t text; begin
  foreach t in array array['universities','faculties','programmes','academic_years','semesters','profiles','user_roles','units','enrolments','topics','learning_resources','quizzes','questions','answers','quiz_attempts','student_progress','bookmarks','content_submissions','content_approvals','material_reports','notifications','assignments','activity_events'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('grant select, insert, update, delete on public.%I to authenticated',t);
  end loop;
end $$;
revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;
grant update(display_name, university_id, programme_id, academic_year_id, semester_id, accessibility_preferences) on public.profiles to authenticated;
revoke insert, update, delete on public.quiz_attempts, public.content_approvals, public.content_submissions from authenticated;

do $$ declare t text; begin
  foreach t in array array['universities','faculties','programmes','academic_years','semesters','units','topics'] loop
    execute format('create policy academic_read on public.%I for select to authenticated using (true)',t);
    execute format('create policy academic_admin on public.%I for all to authenticated using (public.has_role(''administrator'')) with check (public.has_role(''administrator''))',t);
  end loop;
end $$;
create policy profile_read on public.profiles for select to authenticated using(id = auth.uid() or public.has_role('administrator'));
create policy profile_update on public.profiles for update to authenticated using(id = auth.uid()) with check(id = auth.uid());
create policy roles_read on public.user_roles for select to authenticated using(user_id = auth.uid() or public.has_role('administrator'));
create policy roles_manage on public.user_roles for all to authenticated using(public.has_role('administrator')) with check(public.has_role('administrator'));
create policy enrolment_read on public.enrolments for select to authenticated using(student_id = auth.uid() or public.has_role('administrator'));
create policy enrolment_manage on public.enrolments for all to authenticated using(public.has_role('administrator')) with check(public.has_role('administrator'));

create policy resource_read on public.learning_resources for select to authenticated using(status = 'approved' or author_id = auth.uid() or public.has_role('administrator'));
create policy resource_create on public.learning_resources for insert to authenticated with check(author_id = auth.uid() and public.can_contribute() and status = 'draft');
create policy resource_edit on public.learning_resources for update to authenticated
  using(author_id = auth.uid() and status in ('draft','rejected') and public.can_contribute())
  with check(author_id = auth.uid() and status = 'draft' and public.can_contribute());
create policy resource_admin_edit on public.learning_resources for update to authenticated
  using(public.has_role('administrator') and status in ('draft','rejected'))
  with check(public.has_role('administrator') and status = 'draft');
create policy resource_delete on public.learning_resources for delete to authenticated using(author_id = auth.uid() and status = 'draft');
create policy quiz_read on public.quizzes for select to authenticated using(status = 'approved' or author_id = auth.uid() or public.has_role('administrator'));
create policy quiz_create on public.quizzes for insert to authenticated with check(author_id = auth.uid() and public.can_contribute() and status = 'draft');
create policy quiz_edit on public.quizzes for update to authenticated
  using(author_id = auth.uid() and status in ('draft','rejected') and public.can_contribute())
  with check(author_id = auth.uid() and status = 'draft' and public.can_contribute());
create policy quiz_admin_edit on public.quizzes for update to authenticated
  using(public.has_role('administrator') and status in ('draft','rejected'))
  with check(public.has_role('administrator') and status = 'draft');
create policy quiz_delete on public.quizzes for delete to authenticated using(author_id = auth.uid() and status = 'draft');
create policy question_read on public.questions for select to authenticated using(exists(select 1 from public.quizzes q where q.id = quiz_id));
create policy question_manage on public.questions for all to authenticated
  using(exists(select 1 from public.quizzes q where q.id = quiz_id and q.author_id = auth.uid() and q.status = 'draft') and public.can_contribute())
  with check(exists(select 1 from public.quizzes q where q.id = quiz_id and q.author_id = auth.uid() and q.status = 'draft') and public.can_contribute());
create policy answer_manage on public.answers for all to authenticated
  using(exists(select 1 from public.questions x join public.quizzes q on q.id = x.quiz_id where x.id = question_id and (public.has_role('administrator') or (q.author_id = auth.uid() and q.status = 'draft'))) and public.can_contribute())
  with check(exists(select 1 from public.questions x join public.quizzes q on q.id = x.quiz_id where x.id = question_id and q.author_id = auth.uid() and q.status = 'draft') and public.can_contribute());
create policy attempt_read on public.quiz_attempts for select to authenticated using(student_id = auth.uid() or public.has_role('administrator'));
create policy progress_owner on public.student_progress for all to authenticated using(student_id = auth.uid()) with check(student_id = auth.uid());
create policy bookmark_owner on public.bookmarks for all to authenticated using(student_id = auth.uid()) with check(student_id = auth.uid());
create policy submission_read on public.content_submissions for select to authenticated using(contributor_id = auth.uid() or public.has_role('administrator'));
create policy approval_read on public.content_approvals for select to authenticated using(public.has_role('administrator') or exists(select 1 from public.content_submissions s where s.id = submission_id and s.contributor_id = auth.uid()));
create policy report_read on public.material_reports for select to authenticated using(reported_by = auth.uid() or public.has_role('administrator'));
create policy report_create on public.material_reports for insert to authenticated with check(reported_by = auth.uid() and status = 'open' and resolution is null and exists(select 1 from public.learning_resources r where r.id = resource_id and r.status = 'approved'));
create policy report_manage on public.material_reports for update to authenticated using(public.has_role('administrator')) with check(public.has_role('administrator'));
create policy notification_read on public.notifications for select to authenticated using(user_id = auth.uid());
create policy notification_update on public.notifications for update to authenticated using(user_id = auth.uid()) with check(user_id = auth.uid());
revoke update on public.notifications from authenticated;
grant update(read_at) on public.notifications to authenticated;
create policy assignment_read on public.assignments for select to authenticated using(exists(select 1 from public.enrolments e where e.unit_id = assignments.unit_id and e.student_id = auth.uid()) or public.has_role('administrator'));
create policy assignment_admin on public.assignments for all to authenticated using(public.has_role('administrator')) with check(public.has_role('administrator'));
create policy activity_read on public.activity_events for select to authenticated using(user_id = auth.uid() or public.has_role('administrator'));
-- Activity writes come from trusted RPCs, not arbitrary clients.

create function public.submit_content(p_resource_id uuid default null, p_quiz_id uuid default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare submission_id uuid;
begin
  if auth.uid() is null or not public.can_contribute() then raise exception 'Contributor access required'; end if;
  if num_nonnulls(p_resource_id,p_quiz_id) <> 1 then raise exception 'Choose exactly one resource or quiz'; end if;
  if p_resource_id is not null then
    update public.learning_resources set status = 'pending', updated_at = now()
      where id = p_resource_id and author_id = auth.uid() and status in ('draft','rejected');
  else
    if not exists(select 1 from public.questions x where x.quiz_id = p_quiz_id) or exists(select 1 from public.questions x left join public.answers a on a.question_id=x.id where x.quiz_id=p_quiz_id and a.question_id is null) then
      raise exception 'A quiz needs questions and answer keys before review';
    end if;
    update public.quizzes set status = 'pending' where id = p_quiz_id and author_id = auth.uid() and status in ('draft','rejected');
  end if;
  if not found then raise exception 'Content is missing, already submitted, or belongs to someone else'; end if;
  insert into public.content_submissions(contributor_id, resource_id, quiz_id) values(auth.uid(), p_resource_id, p_quiz_id) returning id into submission_id;
  insert into public.activity_events(user_id,kind,description) values(auth.uid(),'submission','Submitted content for review');
  return submission_id;
end; $$;

create function public.review_submission(p_submission_id uuid, p_approved boolean, p_feedback text default '') returns void
language plpgsql security definer set search_path = '' as $$
declare s public.content_submissions; next_status public.content_status;
begin
  if auth.uid() is null or not public.has_role('administrator') then raise exception 'Administrator access required'; end if;
  select * into s from public.content_submissions where id = p_submission_id for update;
  if not found or s.status <> 'pending' then raise exception 'Submission is not awaiting review'; end if;
  if not p_approved and length(trim(p_feedback)) < 5 then raise exception 'Provide useful feedback when rejecting content'; end if;
  next_status := case when p_approved then 'approved'::public.content_status else 'rejected'::public.content_status end;
  update public.content_submissions set status=next_status where id=s.id;
  if s.resource_id is not null then update public.learning_resources set status=next_status,updated_at=now() where id=s.resource_id;
  else update public.quizzes set status=next_status where id=s.quiz_id; end if;
  insert into public.content_approvals(submission_id,reviewer_id,approved,feedback) values(s.id,auth.uid(),p_approved,left(p_feedback,4000));
  insert into public.notifications(user_id,title,body) values(s.contributor_id,case when p_approved then 'Content approved' else 'Content needs revision' end,left(p_feedback,4000));
  insert into public.activity_events(user_id,kind,description) values(auth.uid(),'review',case when p_approved then 'Approved learning content' else 'Returned content for revision' end);
end; $$;

create function public.submit_quiz(p_quiz_id uuid, p_responses jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare q public.quizzes; item record; response text; correct boolean; earned integer := 0; total integer := 0;
  feedback jsonb := '[]'::jsonb; result jsonb; attempt_id uuid; pct numeric(5,2);
begin
  if auth.uid() is null then raise exception 'Sign in to attempt a quiz'; end if;
  if jsonb_typeof(p_responses) is distinct from 'object' then raise exception 'Answers must be an object'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text || p_quiz_id::text,0));
  select * into q from public.quizzes where id=p_quiz_id and status='approved';
  if not found then raise exception 'This quiz is not published'; end if;
  if q.max_attempts is not null and (select count(*) from public.quiz_attempts where student_id=auth.uid() and quiz_id=p_quiz_id) >= q.max_attempts then raise exception 'The maximum number of attempts has been reached'; end if;
  if not exists(select 1 from public.questions where quiz_id=p_quiz_id) then raise exception 'This quiz has no questions'; end if;
  for item in select x.*,a.accepted_answers,a.explanation from public.questions x left join public.answers a on a.question_id=x.id where x.quiz_id=p_quiz_id order by x.position loop
    if item.accepted_answers is null then raise exception 'This quiz has an incomplete answer key'; end if;
    response := trim(coalesce(p_responses->>item.id::text,''));
    if response = '' then raise exception 'Answer every question before submitting'; end if;
    correct := exists(select 1 from unnest(item.accepted_answers) a where lower(trim(a))=lower(response));
    total := total+item.points;
    if correct then earned:=earned+item.points; end if;
    feedback := feedback || jsonb_build_array(jsonb_build_object('question_id',item.id,'answer',response,'correct',correct,'correct_answer',item.accepted_answers[1],'explanation',item.explanation,'points',case when correct then item.points else 0 end));
  end loop;
  pct := round(100.0*earned/total,2);
  insert into public.quiz_attempts(student_id,quiz_id,score,earned_points,total_points,feedback) values(auth.uid(),p_quiz_id,pct,earned,total,feedback) returning id into attempt_id;
  insert into public.activity_events(user_id,kind,description) values(auth.uid(),'quiz','Completed ' || q.title);
  result := jsonb_build_object('attempt_id',attempt_id,'score',pct,'earned_points',earned,'total_points',total,'passed',pct>=q.pass_percent,'feedback',feedback);
  return result;
end; $$;

-- Revoke the default PUBLIC function execution; grant only explicit safe entry points.
revoke all on function public.handle_new_user() from public,anon,authenticated;
revoke all on function public.has_role(public.app_role), public.can_contribute(), public.submit_content(uuid,uuid), public.review_submission(uuid,boolean,text), public.submit_quiz(uuid,jsonb) from public,anon;
grant execute on function public.has_role(public.app_role), public.can_contribute(), public.submit_content(uuid,uuid), public.review_submission(uuid,boolean,text), public.submit_quiz(uuid,jsonb) to authenticated;

create index units_semester_idx on public.units(semester_id);
create index topics_unit_idx on public.topics(unit_id);
create index resources_topic_status_idx on public.learning_resources(topic_id,status);
create index attempts_student_quiz_idx on public.quiz_attempts(student_id,quiz_id,completed_at desc);
create index notifications_user_idx on public.notifications(user_id,created_at desc);
create index submissions_queue_idx on public.content_submissions(status,submitted_at);
create index resource_search_idx on public.learning_resources using gin(to_tsvector('english',title || ' ' || coalesce(body,'')));

-- Private storage: uploads live in <auth.uid()>/<random-id>.pdf (or .vtt, etc.).
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
  values('learning-materials','learning-materials',false,26214400,array['application/pdf','text/plain','text/vtt','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
  on conflict(id) do nothing;
create policy material_upload on storage.objects for insert to authenticated with check(bucket_id='learning-materials' and (storage.foldername(name))[1]=auth.uid()::text and public.can_contribute());
create policy material_read on storage.objects for select to authenticated using(bucket_id='learning-materials' and (
  public.has_role('administrator') or (storage.foldername(name))[1]=auth.uid()::text or
  exists(select 1 from public.learning_resources r where r.status='approved' and (r.storage_path=name or r.captions_path=name))
));
-- Replace/delete only unpublished own files; approved content cannot be silently changed.
create policy material_delete on storage.objects for delete to authenticated using(bucket_id='learning-materials' and (storage.foldername(name))[1]=auth.uid()::text and public.can_contribute() and not exists(select 1 from public.learning_resources r where (r.storage_path=name or r.captions_path=name) and r.status in ('pending','approved')));

commit;
