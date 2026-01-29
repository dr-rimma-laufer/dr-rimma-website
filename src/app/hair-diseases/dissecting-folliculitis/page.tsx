'use client';
import dynamic from 'next/dynamic';
const DissectingFolliculitisPage = dynamic(() => import('../../../components/pages/hairDiseases/DissectingFolliculitisPage').then(mod => mod.DissectingFolliculitisPage), { ssr: false });
export default function Page() { return <DissectingFolliculitisPage onNavigate={() => {}} />; }
