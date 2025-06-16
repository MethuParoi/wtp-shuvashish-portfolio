import { databases, Query } from './appwrite';
import { fallbackBlogs } from '../data/fallbackBlog';

export async function fetchBlogs(limit = 50) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
    
    if (!databaseId || !collectionId) {
      console.log('Using fallback blogs - missing environment variables');
      return fallbackBlogs;
    }
    
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.limit(Math.min(limit, 100)),
      Query.equal('isPublished', true),
      Query.orderDesc('publishedAt')
    ]);
    
    // If no blogs found in database, use fallback
    if (!res.documents || res.documents.length === 0) {
      console.log('Using fallback blogs - no blogs found in database');
      return fallbackBlogs;
    }
    
    console.log(`Fetched ${res.documents.length} blogs from database`);
    return res.documents;
    
  } catch (error) {
    console.error('Error fetching blogs, using fallback:', error);
    return fallbackBlogs;
  }
}

export async function fetchBlogBySlug(slug) {
  try {
    if (!slug || slug.trim() === '') {
      return null;
    }
    
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
    
    if (!databaseId || !collectionId) {
      // Check fallback blogs
      return fallbackBlogs.find(blog => blog.slug === slug) || null;
    }
    
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('slug', slug.trim()),
      Query.equal('isPublished', true)
    ]);
    
    // If not found in database, check fallback
    if (!res.documents || res.documents.length === 0) {
      return fallbackBlogs.find(blog => blog.slug === slug) || null;
    }
    
    return res.documents[0];
  } catch (error) {
    console.error('Error fetching blog by slug, checking fallback:', error);
    return fallbackBlogs.find(blog => blog.slug === slug) || null;
  }
}

