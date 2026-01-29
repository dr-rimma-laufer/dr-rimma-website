'use client';
import dynamic from 'next/dynamic';

const AestheticsPage = dynamic(
  () => import('../../components/pages/AestheticsPage').then(mod => mod.AestheticsPage),
  { ssr: false }
);

export default function Page() {
  return <AestheticsPage onNavigate={() => {}} />;
}
