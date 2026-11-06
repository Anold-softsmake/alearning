import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import './masomo.css';
import { LearningProvider } from '@/lib/store';




const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-roboto', display:'swap' });
export const metadata: Metadata = { title:'MasomoFiti — Your university learning space',description:'Read university notes, practise with quizzes, and track your learning progress with MasomoFiti.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={roboto.variable}><LearningProvider>{children}</LearningProvider></body></html>; }
