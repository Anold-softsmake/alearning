# Inclusive University System

## Current runtime

The start page reproduces the supplied KyU portal maintenance login, with the original logo and background served locally from `public/portal/`. Its login and password recovery controls explain that maintenance prevents authentication. Cookies notice opens an accessible dialog. **Access as a guest** opens the learning dashboard at `/dashboard/`; student, contributor and administration links return to that route. The separate `/login/` account screen retains the optional Supabase integration described below. No university credentials are submitted by the maintenance page.

After building, run `node checks/portal-verify.mjs` to verify the exported dashboard exists, portal layouts at 1440, 768 and 390 pixels, maintenance feedback, cookies and recovery dialogs, guest access and course navigation without browser errors or failed requests. It saves screenshots to `checks/portal-screenshots/` and results with the build ID to `checks/portal-results.json`.

The student curriculum now contains the seven Year 3 Semester 1 units supplied in `notes/YEAR 3`, with 57 structured revision topics and 53 original lecture documents. Each topic follows learning objectives, concepts, an example and solution, key terms, revision questions, and a takeaway. Original files are served from `public/notes/`; document imports accept only PDF, Word, and PowerPoint formats. The source folder's installer is excluded.

`python checks/import-semester.py` regenerates this curriculum and copies the original documents when run from `app/` (the script resolves its paths independently of the working directory). Verified unit codes come from the uploaded outlines; SQA uses a short label where a code was not confirmed. The topic notes are study summaries; original lecture documents remain available for full detail. Bookmarks, progress and quizzes still use this browser's local workspace, with separate topic identifiers for each unit. Existing Supabase seed data is an optional legacy demonstration and is not the imported semester curriculum.

After `npm run build`, run `node checks/semester-workflow.cjs` to check the production export's seven units, source files, reading/navigation, bookmarking and completion persistence, PDF loading, topic downloads, library filters, supplementary quiz, and responsive layouts. It uses an installed Edge/Chrome browser or Playwright Chromium and writes screenshots under `checks/semester-screenshots/`. Run `node checks/verify.mjs` for the broader student and administration workflows, including submissions, approvals, quiz publishing, reports, weekly progress, and calendar dates; its current-curriculum results are saved in `checks/results.json`.

On Windows, automatic Next.js cache cleanup is disabled because OneDrive reparse folders can trigger an `EINVAL` readlink error during cleanup. Next still rebuilds the application and regenerates the static `out/` export. Other operating systems keep the default cache cleanup. Edge can take more than a minute to close after browser assertions finish on this machine; the test scripts print shutdown stages so this delay is distinguishable from a failed assertion.

The static application is an interactive demonstration until a Supabase project is configured. Demonstration course records and locally saved bookmarks, reading progress, quiz results, profile edits and content submissions belong to this browser. They are sample records, are not university records and do not synchronize across devices. The administration demonstration is not an authorization boundary or a live administration console.

No university database, student records, passwords, or integrations existed in the supplied workspace. The captured original page was a Moodle maintenance login screen. This rebuild does not import or replace that portal or migrate its accounts.

## Connect secure accounts and storage

1. Create a Supabase project. Run `supabase/schema.sql` in its SQL editor **once on a fresh project**. This is an initial migration, not an idempotent repeated setup script.
2. Copy `.env.example` to `.env.local`, and set the project's HTTPS URL and **public anon key**. Never put the service-role key in `NEXT_PUBLIC_*`, the browser bundle, or Git.
3. Enable email/password authentication. Configure your production site origin and `https://YOUR_HOST/login/` as an allowed Auth redirect URL. Keep email confirmation enabled. Configure SMTP for reliable account verification and password resets.
4. Rebuild with `npm run build`, then host `out/` as static files over HTTPS. The public configuration is embedded at build time. Every environment change requires a rebuild.
5. Register the initial administrator through Auth. In the trusted SQL editor, add its existing profile UUID with `insert into public.user_roles(user_id, role) values ('USER_UUID', 'administrator');`. Browser registration always grants only the student role. Additional lecturer/contributor roles may be granted by an administrator. Never trust role metadata supplied by a registering user.
6. Create university → faculty → programme → academic year → semester → unit → topic records as an authorized administrator. Add enrolments. Do not invent real students or bulk import personal data without the institution's authorization.

Optionally run `supabase/seed.sql` after creating the administrator. It adds a clearly labelled sample university, six units, six data-structures topics with authored notes, and a five-question practice quiz. It generates real database UUIDs and records the initial sample-content approvals. It creates no users, enrolments, personal records, or fake university accounts. Matching sample records are retained if the seed is run again. Keep sample content separate from the institution's approved curriculum.

## Client integration contract

`src/lib/supabase.ts` exports `backendConfigured` and `supabase` (null without configuration), plus real authentication functions `signIn`, `signUp`, `requestPasswordReset`, `updatePassword`, `signOut`, `getProfile`, and data functions `saveProgress`, `setBookmark`, `submitQuiz`, `reviewSubmission`. Each function throws a readable error when unavailable or rejected by Supabase.

The demonstration's sample IDs are not database UUIDs. Do not send those sample records to the live database. Before switching curriculum and admin views to live mode, query the live entities and keep the demonstration state separate. A configured client enables real authentication; it does **not** automatically migrate sample data or connect a demonstration view to live curriculum. Verify each view's data adapter before describing it as a cloud-backed feature.

For a password recovery return, wait for the Auth recovery session, ask for a new password, and call `updatePassword`. Sending a reset email alone does not change the password. `getProfile` returns the profile plus a `roles` array from the protected role table; render role-specific navigation only after that response. RLS and server-side RPC checks enforce permissions regardless of navigation.

## Content workflow

Contributors create `learning_resources` or `quizzes` in `draft`. Create quiz `questions` with answer keys in `answers`. Upload files under `<user UUID>/<random file name>` in the private `learning-materials` bucket, using a new file name for every revision. Set the resulting path on the draft resource. Video content can reference HTTPS media and a caption file where supplied; the system does not generate captions.

Call `submit_content({p_resource_id: UUID})` or `submit_content({p_quiz_id: UUID})`. This locks the content for review and records a pending submission. Administrators review the pending queue and call `review_submission` with the submission UUID, decision and feedback. Only that authorized database function publishes content and records the audit/notification. Rejection requires meaningful feedback. Contributors can return rejected records to draft, edit, and resubmit.

Approved content cannot be overwritten by contributors. Create a new draft revision and review it before replacing published materials. Storage does not allow overwriting existing objects. Use authenticated downloads or short-lived signed URLs; a private bucket must never be changed to public for convenience. `download_allowed` is a UI permission; any file rendered in a browser can technically be saved. Do not promise copy protection.

## Quizzes and progress

Students can read only approved quizzes and question prompts. They cannot read the `answers` table. `submit_quiz({p_quiz_id: UUID, p_responses: {QUESTION_UUID: "answer"}})` marks on the database, locks concurrent attempts, enforces configured attempt limits, stores the result and returns feedback. Multiple choice uses a stable option ID/value; true/false uses `true`/`false`; short answers use case-insensitive trimmed exact matches against accepted answers. Free-form essays need human assessment and must not be presented as automatically graded.

Correct answers are disclosed only as feedback after a submitted attempt, which intentionally supports learning and retakes. Choose quiz retake limits accordingly. The database, not client-calculated scores, is the source of truth. Reading completion is self-reported study progress, not verified attendance or a credential.

## Required release checks

The migration has been reviewed as source; no database credentials were supplied, so it has not been applied or tested against a live Supabase project. Before production:

- Run the migration on a staging project and test registration, email confirmation, sign-in, reset completion and sign-out.
- Test two separate student accounts: neither may read or change the other's progress, bookmarks, attempts, notifications or profile.
- Verify a student cannot grant roles, read answer keys, change scores, publish content, upload files, read another user's private drafts or open admin records.
- Verify contributors can edit drafts, submit, see feedback and resubmit; approved/pending files cannot be overwritten.
- Verify administrator approval/rejection creates an audit and notification; simultaneous quiz attempts respect the limit.
- Connect all intended curriculum/admin screens to database queries and verify empty, loading, error and success states with real data.
- Configure backups, institution privacy/retention rules, upload scanning, monitoring, rate limits and institutional approval before importing personal records.

Static hosting cannot hide credentials, run server-only secrets, or enforce a client-side administrator switch. Use Supabase RLS and verified roles for every live operation. Client keys are intentionally public; service keys are not.
