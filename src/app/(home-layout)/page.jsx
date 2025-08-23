// app/page.jsx (or app/home/page.jsx)
import BlogSection from '@/components/home/home-page/BlogSection';
import ClientSatisfactionSection from "@/components/home/home-page/ClientSatisfactionSection";
import CompanyGrowthStats from "@/components/home/home-page/CompanyGrowthStats";
import DigitalSolutionsServices from "@/components/home/home-page/DigitalSolutionsServices";
import DigitalMarketingHero from "@/components/home/home-page/HeroSection";
import ProjectsSection from '@/components/home/home-page/ProjectsSection';
import WebDesignCompanyTrust from "@/components/home/home-page/WebDesignCompanyTrust";
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
      <ClientSatisfactionSection
        mainHeading="Our main goal to satisfied local clients"
        accentText="Ad nec unum copiosae. Sea ex everti labores, ad option iuvaret qui muva."
        bodyText="Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio. Aliquam tincidunt sed est at ultrices. Nibh a egestas scelerisque mauris porta. Leo leo in duis pulvinar magnis venenatis faucibus malesuada."
        tags={[
          "Thinking",
          "Analyzing",
          "Dependable",
          "Development",
          "Searching Solution",
        ]}
        teamImage="/team-collaboration.jpg" // Add your team image
        getStartedText="Get Started"
        learnMoreText="Learn More"
      />
      <DigitalSolutionsServices />
      <WebDesignCompanyTrust />
      <CompanyGrowthStats />
      <BlogSection />
      <ProjectsSection />
    </section>
  );
}
