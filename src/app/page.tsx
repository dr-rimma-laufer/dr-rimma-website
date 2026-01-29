import { HeroSection } from '../components/home/HeroSection';
import { AboutPreview } from '../components/home/AboutPreview';
import { ExpertiseSection } from '../components/home/ExpertiseSection';
import { ServicesCardsSection } from '../components/home/ServicesCardsSection';
import { ReviewsGallery } from '../components/home/ReviewsGallery';
import { CTASection } from '../components/home/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutPreview />
      <ExpertiseSection />
      <ServicesCardsSection />
      <ReviewsGallery />
      <CTASection />
    </main>
  );
}
