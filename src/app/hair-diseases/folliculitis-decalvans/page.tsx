'use client';
import dynamic from 'next/dynamic';
const FolliculitisDecalvansPage = dynamic(() => import('../../../components/pages/hairDiseases/FolliculitisDecalvansPage').then(mod => mod.FolliculitisDecalvansPage), { ssr: false });
export default function Page() { return <FolliculitisDecalvansPage onNavigate={() => {}} />; }
