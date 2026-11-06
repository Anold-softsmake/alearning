import type { Metadata } from 'next';
import { Shell } from '@/components/shell';
import { Dashboard } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'MasomoFiti | Your university learning space',
  description: 'Read your university notes, practise with quizzes, and track your learning progress with MasomoFiti.',
};

export default function Page() {
  return (
    <Shell>
      <Dashboard />
    </Shell>
  );
}
