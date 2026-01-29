'use client';
import dynamic from 'next/dynamic';

const ContactPage = dynamic(
  () => import('../../components/pages/ContactPage').then(mod => mod.ContactPage),
  { ssr: false }
);

export default function Page() {
  return <ContactPage onNavigate={() => {}} />;
}
