import { createClient, type User } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const backendConfigured = Boolean(url && key);
export const supabase = url && key ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null;

function client() {
  if (!supabase) throw new Error("Live accounts are not connected yet. Configure Supabase to enable secure sign-in and cloud saving.");
  return supabase;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await client().auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, displayName: string) {
  const { data, error } = await client().auth.signUp({
    email: email.trim(), password,
    options: { data: { display_name: displayName.trim() }, emailRedirectTo: typeof window === "undefined" ? undefined : `${window.location.origin}/login/` },
  });
  if (error) throw error;
  return data;
}

export async function requestPasswordReset(email: string) {
  const { error } = await client().auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/login/?reset=true`,
  });
  if (error) throw error;
}

export async function updatePassword(password: string) {
  const { data, error } = await client().auth.updateUser({ password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await client().auth.signOut();
  if (error) throw error;
}

export async function getProfile(user?: User) {
  const db = client();
  const current = user ?? (await db.auth.getUser()).data.user;
  if (!current) return null;
  const [profile, roles] = await Promise.all([
    db.from("profiles").select("*").eq("id", current.id).single(),
    db.from("user_roles").select("role").eq("user_id", current.id),
  ]);
  if (profile.error) throw profile.error;
  if (roles.error) throw roles.error;
  return { ...profile.data, roles: roles.data.map((row) => row.role) };
}

export async function saveProgress(topicId: string, percent: number, completed = false) {
  const db = client();
  const { data: { user } } = await db.auth.getUser();
  if (!user) throw new Error("Sign in to save your learning progress.");
  const { error } = await db.from("student_progress").upsert({
    student_id: user.id, topic_id: topicId, percent: completed ? 100 : Math.min(100, Math.max(0, percent)),
    completed, last_read_at: new Date().toISOString(),
  }, { onConflict: "student_id,topic_id" });
  if (error) throw error;
}

export async function setBookmark(topicId: string, saved: boolean) {
  const db = client();
  const { data: { user } } = await db.auth.getUser();
  if (!user) throw new Error("Sign in to save bookmarks.");
  const query = saved
    ? db.from("bookmarks").upsert({ student_id: user.id, topic_id: topicId }, { onConflict: "student_id,topic_id" })
    : db.from("bookmarks").delete().eq("student_id", user.id).eq("topic_id", topicId);
  const { error } = await query;
  if (error) throw error;
}

export async function submitQuiz(quizId: string, responses: Record<string, string>) {
  const { data, error } = await client().rpc("submit_quiz", { p_quiz_id: quizId, p_responses: responses });
  if (error) throw error;
  return data;
}

export async function reviewSubmission(submissionId: string, approved: boolean, feedback: string) {
  const { data, error } = await client().rpc("review_submission", {
    p_submission_id: submissionId, p_approved: approved, p_feedback: feedback.trim(),
  });
  if (error) throw error;
  return data;
}
