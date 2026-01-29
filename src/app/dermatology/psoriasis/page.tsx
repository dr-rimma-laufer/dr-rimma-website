'use client';
import dynamic from 'next/dynamic';
const PsoriasisPage = dynamic(() => import('../../../components/pages/dermatology/PsoriasisPage').then(mod => mod.PsoriasisPage), { ssr: false });
export default function Page() { return <PsoriasisPage onNavigate={() => {}} />; }
