// // lib/projectOperations.js
// import { databases } from './appwrite';

// export async function updateProject(projectId, updatedData) {
//   try {
//     const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//     const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
    
//     if (!databaseId || !collectionId) {
//       throw new Error('Missing required environment variables');
//     }
    
//     if (!projectId) {
//       throw new Error('Project ID is required for update operation');
//     }
    
//     // Prepare the data for update - only include non-empty fields
//     const updatePayload = {};
    
//     if (updatedData.title && updatedData.title.trim() !== '') {
//       updatePayload.title = updatedData.title.trim();
//     }
    
//     if (updatedData.content && updatedData.content.trim() !== '') {
//       updatePayload.content = updatedData.content.trim();
//     }
    
//     if (updatedData.projectLink !== undefined) {
//       updatePayload.projectLink = updatedData.projectLink.trim();
//     }
    
//     if (updatedData.keyFeatures && Array.isArray(updatedData.keyFeatures)) {
//       updatePayload.keyFeatures = updatedData.keyFeatures.filter(feature => feature.trim() !== '');
//     }
    
//     if (updatedData.image !== undefined) {
//       updatePayload.image = updatedData.image;
//     }
    
//     // Add update timestamp
//     updatePayload.updatedAt = new Date().toISOString();
    
//     const response = await databases.updateDocument(
//       databaseId,
//       collectionId,
//       projectId,
//       updatePayload
//     );
    
//     console.log('✅ Project updated successfully:', {
//       projectId: response.$id,
//       title: response.title
//     });
    
//     return response;
    
//   } catch (error) {
//     console.error('❌ Error updating project:', error);
    
//     if (error.code === 404) {
//       throw new Error('Project not found. It may have been deleted.');
//     } else if (error.code === 401) {
//       throw new Error('Authentication failed. Please refresh and try again.');
//     } else if (error.code === 403) {
//       throw new Error('Permission denied. Unable to update project.');
//     } else {
//       throw new Error(`Failed to update project: ${error.message || 'Unknown error occurred'}`);
//     }
//   }
// }

// export async function deleteProject(projectId) {
//   try {
//     const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//     const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
    
//     if (!databaseId || !collectionId) {
//       throw new Error('Missing required environment variables');
//     }
    
//     if (!projectId) {
//       throw new Error('Project ID is required for delete operation');
//     }
    
//     // First, get the project to check if it has an associated image
//     const project = await databases.getDocument(
//       databaseId,
//       collectionId,
//       projectId
//     );
    
//     // Delete the project document
//     await databases.deleteDocument(
//       databaseId,
//       collectionId,
//       projectId
//     );
    
//     console.log('✅ Project deleted successfully:', {
//       projectId: projectId,
//       title: project.title
//     });
    
//     return { success: true, deletedProject: project };
    
//   } catch (error) {
//     console.error('❌ Error deleting project:', error);
    
//     if (error.code === 404) {
//       throw new Error('Project not found. It may have already been deleted.');
//     } else if (error.code === 401) {
//       throw new Error('Authentication failed. Please refresh and try again.');
//     } else if (error.code === 403) {
//       throw new Error('Permission denied. Unable to delete project.');
//     } else {
//       throw new Error(`Failed to delete project: ${error.message || 'Unknown error occurred'}`);
//     }
//   }
// }

// export async function getProjectById(projectId) {
//   try {
//     const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
//     const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
    
//     if (!databaseId || !collectionId) {
//       throw new Error('Missing required environment variables');
//     }
    
//     const response = await databases.getDocument(
//       databaseId,
//       collectionId,
//       projectId
//     );
    
//     return response;
    
//   } catch (error) {
//     console.error('❌ Error fetching project:', error);
    
//     if (error.code === 404) {
//       throw new Error('Project not found.');
//     } else {
//       throw new Error(`Failed to fetch project: ${error.message || 'Unknown error occurred'}`);
//     }
//   }
// }

// lib/projectOperations.js
import { databases } from './appwrite';

export async function updateProject(id, fields) {
  const dbId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const colId = process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS;
  if (!id || !dbId || !colId) {
    throw new Error('Missing project ID or environment variables'); 
  }
  // Build payload of only non-empty fields
  const payload = {};
  if (fields.title) payload.title = fields.title.trim();
  if (fields.content) payload.content = fields.content.trim();
  if (fields.image) payload.image = fields.image;
//   payload.updatedAt = new Date().toISOString();

  if (Object.keys(payload).length === 0) {
    throw new Error('No data provided for update'); 
  }

  return databases.updateDocument(dbId, colId, id, payload);
}


