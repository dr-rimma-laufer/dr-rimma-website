'use client';
import dynamic from 'next/dynamic';
const SeborrheicDermatitisPage = dynamic(() => import('../../../components/pages/hairDiseases/SeborrheicDermatitisPage').then(mod => mod.SeborrheicDermatitisPage), { ssr: false });
export default function Page() { return <SeborrheicDermatitisPage onNavigate={() => {}} />; }
