'use client';
import dynamic from 'next/dynamic';

const AboutPage = dynamic(
  () => import('../../components/pages/AboutPage').then(mod => mod.AboutPage),
  { ssr: false }
);

export default function Page() {
  return <AboutPage onNavigate={() => {}} />;
}
