// app/blog/[slug]/page.jsx
import { fetchBlogBySlug } from '../../../../lib/fetchBlog';

export default async function BlogDetailPage({ params }) {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    return <div className="text-center py-16">Blog post not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <img
        src={blog.featuredImage || '/placeholder.jpg'}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="flex items-center mb-4 text-gray-500 text-sm">
        <span>By {blog.author}</span>
        {blog.publishedAt && (
          <span className="ml-4">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
