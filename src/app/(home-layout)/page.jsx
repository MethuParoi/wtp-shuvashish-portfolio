// app/page.jsx (or app/home/page.jsx)
import { fetchBlogs } from '../../lib/fetchBlog';
import BlogGrid from '../../components/home/blog/BlogGrid';

export default async function HomePage() {
  const blogs = await fetchBlogs();

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>
      <BlogGrid blogs={blogs} />
    </section>
  );
}
