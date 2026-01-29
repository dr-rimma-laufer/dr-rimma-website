'use client';
import dynamic from 'next/dynamic';
const VitiligioPage = dynamic(() => import('../../../components/pages/dermatology/VitiligioPage').then(mod => mod.VitiligioPage), { ssr: false });
export default function Page() { return <VitiligioPage onNavigate={() => {}} />; }
