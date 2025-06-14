// // lib/blogs.js
import { databases, Query } from './appwrite';

// export async function fetchBlogs() {
//   const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//   const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
//   const res = await databases.listDocuments(databaseId, collectionId, []);
//   return res.documents;
// }

export async function fetchBlogsWithCursor(limit = 50, cursorAfter = null) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
    
    const queries = [
      Query.limit(limit),
      Query.equal('isPublished', true),
      Query.orderDesc('publishedAt')
    ];
    
    // Add cursor if provided for pagination
    if (cursorAfter) {
      queries.push(Query.cursorAfter(cursorAfter));
    }
    
    const res = await databases.listDocuments(databaseId, collectionId, queries);
    
    return {
      documents: res.documents,
      hasMore: res.documents.length === limit,
      lastCursor: res.documents.length > 0 ? res.documents[res.documents.length - 1].$id : null
    };
  } catch (error) {
    console.error('Error fetching blogs with cursor:', error);
    return { documents: [], hasMore: false, lastCursor: null };
  }
}


export async function fetchBlogBySlug(slug) {
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
  const res = await databases.listDocuments(databaseId, collectionId, [
    Query.equal('slug', slug)
  ]);
  return res.documents[0];
}

//-------------------------------------


// lib/fetchBlog.js
// import { databases, Query } from './appwrite';

// export async function fetchBlogs() {
//     try {
//         const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//         const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
        
//         const res = await databases.listDocuments(databaseId, collectionId, [
//             Query.equal('isPublished', true),
//             Query.orderDesc('publishedAt')
//         ]);
        
//         return res.documents;
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         return [];
//     }
// }

// export async function fetchBlogBySlug(slug) {
//     try {
//         const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//         const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
        
//         const res = await databases.listDocuments(databaseId, collectionId, [
//             Query.equal('slug', slug),
//             Query.equal('isPublished', true)
//         ]);
        
//         return res.documents[0] || null;
//     } catch (error) {
//         console.error('Error fetching blog by slug:', error);
//         return null;
//     }
// }
