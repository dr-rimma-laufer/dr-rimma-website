'use client';
import dynamic from 'next/dynamic';

const DermatologyPage = dynamic(
  () => import('../../components/pages/dermatology/DermatologyPage').then(mod => mod.DermatologyPage),
  { ssr: false }
);

export default function Page() {
  return <DermatologyPage onNavigate={() => {}} />;
}
