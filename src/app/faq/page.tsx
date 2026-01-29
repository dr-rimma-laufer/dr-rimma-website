'use client';
import dynamic from 'next/dynamic';

const FAQPage = dynamic(
  () => import('../../components/pages/FAQPage').then(mod => mod.FAQPage),
  { ssr: false }
);

export default function Page() {
  return <FAQPage onNavigate={() => {}} />;
}
