// lib/storage.js
import { storage, ID } from './appwrite';

// Upload file to Appwrite storage
export const uploadFile = async (file) => {
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_BUCKET_ID_PROJECTS,
            ID.unique(),
            file
        );
        return response;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};

// Get file preview from Appwrite storage
export const getFilePreview = (fileId) => {
    return storage.getFilePreview(
        process.env.NEXT_PUBLIC_BUCKET_ID_PROJECTS,
        fileId
    );
};

// Get file view from Appwrite storage
export const getFileView = (fileId) => {
    return storage.getFileView(
        process.env.NEXT_PUBLIC_BUCKET_ID_PROJECTS,
        fileId
    );
};

// Delete file from Appwrite storage
export const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(
            process.env.NEXT_PUBLIC_BUCKET_ID_PROJECTS,
            fileId
        );
    } catch (error) {
        console.error('Delete failed:', error);
        throw error;
    }
};

// Optional: Create a storage object for backward compatibility
export const storageService = {
    uploadFile,
    getFilePreview,
    getFileView,
    deleteFile
};

// Default export for convenience
export default {
    uploadFile,
    getFilePreview,
    getFileView,
    deleteFile
};
