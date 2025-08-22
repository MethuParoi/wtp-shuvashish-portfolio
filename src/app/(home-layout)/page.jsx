// app/page.jsx (or app/home/page.jsx)
import BlogSection from '@/components/home/home-page/BlogSection';
import DigitalMarketingHero from "@/components/home/home-page/HeroSection";
import ProjectsSection from '@/components/home/home-page/ProjectsSection';
import WebsiteTrafficBoost from "@/components/home/home-page/WebsiteTrafficBoost";

export default async function HomePage() {
  

  return (
    <section className="container mx-auto lg:pr-18 lg:pl-14">
      <DigitalMarketingHero />
      <WebsiteTrafficBoost
        title="Boost Your Website Traffic!"
        description="Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit."
        steps={[
          {
            number: "01",
            title: "Market Research",
            description:
              "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit.",
            hasLightning: true,
          },
          {
            number: "02",
            title: "SEO Optimization",
            description:
              "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit.",
          },
          {
            number: "03",
            title: "Ad Support",
            description:
              "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit.",
          },
          {
            number: "04",
            title: "Brand Strategy",
            description:
              "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit.",
          },
        ]}
      />
      <BlogSection />
      <ProjectsSection />
    </section>
  );
}
