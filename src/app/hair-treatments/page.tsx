'use client';
import dynamic from 'next/dynamic';

const HairTreatmentsPage = dynamic(
  () => import('../../components/pages/HairTreatments/HairTreatmentsPage').then(mod => mod.HairTreatmentsPage),
  { ssr: false }
);

export default function Page() {
  return <HairTreatmentsPage onNavigate={() => {}} />;
}
