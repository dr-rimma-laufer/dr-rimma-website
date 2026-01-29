'use client';
import dynamic from 'next/dynamic';
const PRPTreatmentPage = dynamic(() => import('../../../components/pages/HairTreatments/PRPTreatmentPage').then(mod => mod.PRPTreatmentPage), { ssr: false });
export default function Page() { return <PRPTreatmentPage onNavigate={() => {}} />; }
