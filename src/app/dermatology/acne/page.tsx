'use client';
import dynamic from 'next/dynamic';
const AcnePage = dynamic(() => import('../../../components/pages/dermatology/AcnePage').then(mod => mod.AcnePage), { ssr: false });
export default function Page() { return <AcnePage onNavigate={() => {}} />; }
