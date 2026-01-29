'use client';
import dynamic from 'next/dynamic';
const MedicationTreatmentPage = dynamic(() => import('../../../components/pages/HairTreatments/MedicationTreatmentPage').then(mod => mod.MedicationTreatmentPage), { ssr: false });
export default function Page() { return <MedicationTreatmentPage onNavigate={() => {}} />; }
