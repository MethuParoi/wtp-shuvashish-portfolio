'use client';

import { useRouter } from 'next/navigation';

export default function BlogCard({ blog }) {
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
      onClick={() => router.push(`/blog/${blog.slug}`)}
    >
      <img
        src={blog.featuredImage || '/placeholder.jpg'}
        alt={blog.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm flex-1">{blog.excerpt}</p>
        <div className="flex items-center mt-4">
          <span className="text-xs text-gray-500">By {blog.author}</span>
        </div>
      </div>
    </div>
  );
}
