'use client';
import dynamic from 'next/dynamic';
const AcneKeloidalisNuchaePage = dynamic(() => import('../../../components/pages/hairDiseases/AcneKeloidalisNuchaePage').then(mod => mod.AcneKeloidalisNuchaePage), { ssr: false });
export default function Page() { return <AcneKeloidalisNuchaePage onNavigate={() => {}} />; }
