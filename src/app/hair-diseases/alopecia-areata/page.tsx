'use client';
import dynamic from 'next/dynamic';
const AlopeciaAreataPage = dynamic(() => import('../../../components/pages/hairDiseases/AlopeciaAreataPage').then(mod => mod.AlopeciaAreataPage), { ssr: false });
export default function Page() { return <AlopeciaAreataPage onNavigate={() => {}} />; }
