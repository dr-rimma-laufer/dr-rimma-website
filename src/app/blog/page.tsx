'use client';
import dynamic from 'next/dynamic';

const BlogPage = dynamic(
  () => import('../../components/pages/BlogPage').then(mod => mod.BlogPage),
  { ssr: false }
);

export default function Page() {
  return <BlogPage onNavigate={() => {}} />;
}
