'use client';
import dynamic from 'next/dynamic';
const LichenPlanopolarisPage = dynamic(() => import('../../../components/pages/hairDiseases/LichenPlanopolarisPage').then(mod => mod.LichenPlanopolarisPage), { ssr: false });
export default function Page() { return <LichenPlanopolarisPage onNavigate={() => {}} />; }
