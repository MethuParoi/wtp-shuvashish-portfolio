import { databases, Query } from './appwrite';

export async function fetchProjects(limit = 50) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
    
    if (!databaseId || !collectionId) {
      console.error('Missing required environment variables');
      return [];
    }
    
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.limit(Math.min(limit, 100)),
      Query.orderDesc('createdAt')
    ]);
    
    // console.log(`Fetched ${res.documents.length} projects successfully`);
    return res.documents || [];
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchProjectBySlug(slug) {
    console.log(`Fetching project with slug: ${slug}`);
if (!slug) {
  console.error('No slug provided for fetching project');
  return null;
}
  try {
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
    
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('projectSlug', slug)
    ]);
    console.log(`Fetched ${res.documents.length} projects successfully`);
    return res.documents[0] || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

