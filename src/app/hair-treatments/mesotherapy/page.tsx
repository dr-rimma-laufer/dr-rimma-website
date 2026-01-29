'use client';
import dynamic from 'next/dynamic';
const MesotherapyTreatmentPage = dynamic(() => import('../../../components/pages/HairTreatments/MesotherapyTreatmentPage').then(mod => mod.MesotherapyTreatmentPage), { ssr: false });
export default function Page() { return <MesotherapyTreatmentPage onNavigate={() => {}} />; }
