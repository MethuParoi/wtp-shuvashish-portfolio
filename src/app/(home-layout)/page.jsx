// app/page.jsx (or app/home/page.jsx)
import BlogSection from '@/components/home/home-page/BlogSection';
import DigitalMarketingHero from "@/components/home/home-page/HeroSection";
import ProjectsSection from '@/components/home/home-page/ProjectsSection';

export default async function HomePage() {
  

  return (
    <section className="container mx-auto px-4 py-12">
      <DigitalMarketingHero />
      <BlogSection />
      <ProjectsSection />
    </section>
  );
}
