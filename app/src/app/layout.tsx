import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import './masomo.css';
import { LearningProvider } from '@/lib/store';




const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-roboto', display:'swap' });
export const metadata: Metadata = { title:'Inclusi — Your learning, without limits',description:'An inclusive university learning space. Read, practise, and grow at your own pace.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={roboto.variable}><LearningProvider>{children}</LearningProvider></body></html>; }
