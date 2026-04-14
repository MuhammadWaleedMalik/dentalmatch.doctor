import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ReportSection from '@/components/sections/ReportSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import MobileAppSection from '@/components/sections/MobileAppSection';
import BlogSection from '@/components/sections/BlogSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <StatsSection />
      <FeaturesSection />
      <ReportSection />
      <TestimonialsSection />
      <MobileAppSection />
      <BlogSection />
      <NewsletterSection />
    </>
  );
}
