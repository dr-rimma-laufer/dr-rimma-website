'use client';
import dynamic from 'next/dynamic';
const TractionAlopeciaPage = dynamic(() => import('../../../components/pages/hairDiseases/TractionAlopeciaPage').then(mod => mod.TractionAlopeciaPage), { ssr: false });
export default function Page() { return <TractionAlopeciaPage onNavigate={() => {}} />; }
