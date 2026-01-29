'use client';
import dynamic from 'next/dynamic';
const EczemaPage = dynamic(() => import('../../../components/pages/dermatology/EczemaPage').then(mod => mod.EczemaPage), { ssr: false });
export default function Page() { return <EczemaPage onNavigate={() => {}} />; }
