import type { Metadata } from 'next';
import { PortalLogin } from '@/components/portal-login';

export const metadata: Metadata = {
  title: 'In maintenance mode | Masomo Year 3 & 4',
  description: 'Log in to KyU Masomo Portal.',
};

export default function Page() {
  return <PortalLogin />;
}
