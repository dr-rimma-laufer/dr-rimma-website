'use client';
import dynamic from 'next/dynamic';
const LupusErythematosusPage = dynamic(() => import('../../../components/pages/hairDiseases/LupusErythematosusPage').then(mod => mod.LupusErythematosusPage), { ssr: false });
export default function Page() { return <LupusErythematosusPage onNavigate={() => {}} />; }
