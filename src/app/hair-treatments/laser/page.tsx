'use client';
import dynamic from 'next/dynamic';
const LaserTreatmentPage = dynamic(() => import('../../../components/pages/HairTreatments/LaserTreatmentPage').then(mod => mod.LaserTreatmentPage), { ssr: false });
export default function Page() { return <LaserTreatmentPage onNavigate={() => {}} />; }
