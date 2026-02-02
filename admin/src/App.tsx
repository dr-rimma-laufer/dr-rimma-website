import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import useAuthStore from './store/auth';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PagesManager = React.lazy(() => import('./pages/PagesManager'));
const TreatmentsManager = React.lazy(() => import('./pages/TreatmentsManager'));
const ConditionsManager = React.lazy(() => import('./pages/ConditionsManager'));
const BlogManager = React.lazy(() => import('./pages/BlogManager'));
const FAQManager = React.lazy(() => import('./pages/FAQManager'));
const GalleryManager = React.lazy(() => import('./pages/GalleryManager'));
const TestimonialsManager = React.lazy(() => import('./pages/TestimonialsManager'));
const NavigationManager = React.lazy(() => import('./pages/NavigationManager'));
const MediaLibrary = React.lazy(() => import('./pages/MediaLibrary'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="spinner w-10 h-10"></div>
  </div>
);

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesManager />} />
          <Route path="treatments" element={<TreatmentsManager />} />
          <Route path="conditions" element={<ConditionsManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="faq" element={<FAQManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="navigation" element={<NavigationManager />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default App;
