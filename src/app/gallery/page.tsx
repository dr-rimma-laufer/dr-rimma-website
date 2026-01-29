'use client';
import dynamic from 'next/dynamic';

const GalleryPage = dynamic(
  () => import('../../components/pages/GalleryPage').then(mod => mod.GalleryPage),
  { ssr: false }
);

export default function Page() {
  return <GalleryPage onNavigate={() => {}} />;
}
