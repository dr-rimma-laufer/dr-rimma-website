'use client';
import dynamic from 'next/dynamic';

const HairTransplantPage = dynamic(
  () => import('../../components/pages/HairTransplantation/HairTransplantPage').then(mod => mod.HairTransplantPage),
  { ssr: false }
);

export default function Page() {
  return <HairTransplantPage onNavigate={() => {}} />;
}
