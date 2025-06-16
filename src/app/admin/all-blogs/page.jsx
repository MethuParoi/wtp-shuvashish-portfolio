import { fetchBlogs } from '@/lib/fetchBlog';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const loadBlogs = async () => {
        try {
          const data = await fetchBlogs(); // Make sure this function is available client-side or fetch from an API route
          setBlogs(data);
        } catch (err) {
          console.error("Error loading blogs:", err);
          setError("Unable to load blog posts at the moment.");
        }
      };
  
      loadBlogs();
    }, []);
  return (
    <div>page</div>
  )
}

export default page