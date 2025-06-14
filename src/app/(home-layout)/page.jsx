// app/page.jsx (or app/home/page.jsx)
import BlogSection from '@/components/home/home-page/BlogSection';
import ProjectsSection from '@/components/home/home-page/ProjectsSection';

export default async function HomePage() {
  

  return (
    <section className="container mx-auto px-4 py-12">
        <BlogSection/>
        <ProjectsSection/>
      
      
    </section>
  );
}
