// app/page.jsx (or app/home/page.jsx)
import LatestNews from "@/components/home/home-page/blog/LatestNews";
import BlogSection from "@/components/home/home-page/BlogSection";
import ClientSatisfactionSection from "@/components/home/home-page/ClientSatisfactionSection";
import CompanyGrowthStats from "@/components/home/home-page/CompanyGrowthStats";
import ContactForm from "@/components/home/home-page/ContactForm";
import DigitalSolutionsServices from "@/components/home/home-page/DigitalSolutionsServices";
import DigitalMarketingHero from "@/components/home/home-page/HeroSection";
import ProfessionalSEOAgency from "@/components/home/home-page/ProfessionalSEOAgency";
import ProjectsSection from "@/components/home/home-page/ProjectsSection";
import ClientTestimonials from "@/components/home/home-page/testimonial/ClientTestimonials";
import ThingsWeMadePortfolio from "@/components/home/home-page/ThingsWeMadePortfolio";
import WebDesignCompanyTrust from "@/components/home/home-page/WebDesignCompanyTrust";
import Services from "@/components/home/home-page/Services";

export default async function HomePage() {
  return (
    <section className="container mx-auto lg:pr-18 lg:pl-14">
      <DigitalMarketingHero />
      <Services />
      <ProjectsSection />
      <LatestNews />
      <ClientSatisfactionSection />
      <DigitalSolutionsServices />
      <WebDesignCompanyTrust />
      <CompanyGrowthStats />
      <ThingsWeMadePortfolio />
      <ProfessionalSEOAgency />
      <ClientTestimonials />

      <ContactForm />
      {/* <BlogSection /> */}
    </section>
  );
}
