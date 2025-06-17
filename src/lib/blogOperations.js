import { databases, storage } from './appwrite';

export async function updateBlog(blogId, updatedData) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
    
    if (!databaseId || !collectionId) {
      throw new Error('Missing required environment variables');
    }
    
    if (!blogId) {
      throw new Error('Blog ID is required for update operation');
    }

    const updatePayload = {};
    
    if (updatedData.title && updatedData.title.trim() !== '') {
      updatePayload.title = updatedData.title.trim();
    }
    
    if (updatedData.content && updatedData.content.trim() !== '') {
      updatePayload.content = updatedData.content.trim();
    }
    
    if (updatedData.excerpt !== undefined) {
      updatePayload.excerpt = updatedData.excerpt.trim();
    }
    
    if (updatedData.author && updatedData.author.trim() !== '') {
      updatePayload.author = updatedData.author.trim();
    }
    
    if (updatedData.slug !== undefined) {
      updatePayload.slug = updatedData.slug;
    }
    
    if (updatedData.tags !== undefined) {
      updatePayload.tags = updatedData.tags;
    }
    
    if (updatedData.featuredImage !== undefined) {
      updatePayload.featuredImage = updatedData.featuredImage;
    }
    
    if (updatedData.isPublished !== undefined) {
      updatePayload.isPublished = updatedData.isPublished;
    }
    
    updatePayload.updatedAt = new Date().toISOString();

    if (Object.keys(updatePayload).length === 0) {
      throw new Error('No valid data provided for update');
    }
    
    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      blogId,
      updatePayload
    );
    
    console.log('✅ Blog updated successfully:', {
      blogId: response.$id,
      title: response.title,
      slug: response.slug
    });
    
    return response;
    
  } catch (error) {
    console.error('❌ Error updating blog:', error);
    
    if (error.code === 404) {
      throw new Error('Blog not found. It may have been deleted.');
    } else if (error.code === 401) {
      throw new Error('Authentication failed. Please refresh and try again.');
    } else if (error.code === 403) {
      throw new Error('Permission denied. Unable to update blog.');
    } else {
      throw new Error(`Failed to update blog: ${error.message || 'Unknown error occurred'}`);
    }
  }
}

export async function deleteBlog(blogId) {
  const dbId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const colId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
  const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID_PROJECTS;

  if (!blogId || !dbId || !colId || !bucketId) {
    throw new Error('Missing blog ID or environment variables'); 
  }

  // 1. Fetch blog to obtain image file ID
  const blog = await databases.getDocument(dbId, colId, blogId)  
    .catch(() => { throw new Error('blog not found'); });

  // 2. Delete file from storage if image exists
  if (blog.featuredImage) {
    // Extract fileId from full view URL query param
    const url = new URL(blog.featuredImage);
    const fileId = url.pathname.split('/files/')[1].split('/view')[0];
    await storage.deleteFile(bucketId, fileId)  
      .catch(() => console.warn('Image deletion failed or already removed'));
  }

  // 3. Delete blog document
  await databases.deleteDocument(dbId, colId, blogId)  
    .catch(err => { throw new Error(`Failed to delete blog: ${err.message}`); });

  return { success: true };
}

// export async function deleteBlog(blogId) {
//   try {
//     const databaseId = process.env.NEXT_PUBLIC_blog_ID;
//     const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
//     const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID_blogS;
    
//     if (!databaseId || !collectionId) {
//       throw new Error('Missing required environment variables');
//     }
    
//     if (!blogId) {
//       throw new Error('Blog ID is required for delete operation');
//     }
    
//     // Get the blog to check if it has an associated image
//     const blog = await databases.getDocument(
//       databaseId,
//       collectionId,
//       blogId
//     );
    
//     // Delete associated image if exists
//     if (blog.featuredImage && bucketId) {
//       try {
//         const url = new URL(blog.featuredImage);
//         const fileId = url.pathname.split('/files/')[1].split('/view')[0];
//         await storage.deleteFile(bucketId, fileId);
//       } catch (imageError) {
//         console.warn('Featured image deletion failed or already removed:', imageError);
//       }
//     }
    
//     // Delete the blog document
//     await databases.deleteDocument(
//       databaseId,
//       collectionId,
//       blogId
//     );
    
//     console.log('✅ Blog deleted successfully:', {
//       blogId: blogId,
//       title: blog.title
//     });
    
//     return { success: true, deletedBlog: blog };
    
//   } catch (error) {
//     console.error('❌ Error deleting blog:', error);
    
//     if (error.code === 404) {
//       throw new Error('Blog not found. It may have already been deleted.');
//     } else if (error.code === 401) {
//       throw new Error('Authentication failed. Please refresh and try again.');
//     } else if (error.code === 403) {
//       throw new Error('Permission denied. Unable to delete blog.');
//     } else {
//       throw new Error(`Failed to delete blog: ${error.message || 'Unknown error occurred'}`);
//     }
//   }
// }

export async function getBlogById(blogId) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS;
    
    if (!databaseId || !collectionId) {
      throw new Error('Missing required environment variables');
    }
    
    const response = await databases.getDocument(
      databaseId,
      collectionId,
      blogId
    );
    
    return response;
    
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    
    if (error.code === 404) {
      throw new Error('Blog not found.');
    } else {
      throw new Error(`Failed to fetch blog: ${error.message || 'Unknown error occurred'}`);
    }
  }
}
