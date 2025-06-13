// components/ProjectUploadForm.jsx
'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import db from '../../../lib/databases';
import storageService from '../../../lib/storage';
import { toast } from 'react-toastify';

const ProjectUploadForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
            projectLink: '',
            keyFeatures: [],
            image: null
        }
    });

    const watchedImage = watch('image');

    const validateFile = (files) => {
        if (!files || files.length === 0) {
            return 'Image is required';
        }
        
        const file = files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        
        if (file.size > maxSize) {
            return 'File size must be less than 10MB';
        }
        
        if (!allowedTypes.includes(file.type)) {
            return 'Only JPEG, PNG, GIF, and WebP files are allowed';
        }
        
        return true;
    };

    //upddated onSubmit function to handle file upload and database creation
    const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
        let imageUrl = '';
        
        // Upload image if provided
        if (data.image && data.image[0]) {
            const file = data.image[0];
            
            try {
                // Upload file to Appwrite storage bucket
                const uploadedFile = await storageService.uploadFile(file);
                
                // Verify upload response
                if (!uploadedFile || !uploadedFile.$id || !uploadedFile.bucketId) {
                    throw new Error('Invalid upload response from storage service');
                }
                
                // Construct the image URL dynamically from the response
                const bucketId = uploadedFile.bucketId;
                const fileId = uploadedFile.$id;
                const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
                
                // Validate environment variables
                if (!projectId || !endpoint) {
                    throw new Error('Missing required environment configuration');
                }
                
                // Build the complete image URL
                imageUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
                
                console.log('✅ Image uploaded successfully:', {
                    fileId: uploadedFile.$id,
                    fileName: uploadedFile.name,
                    fileSize: uploadedFile.sizeOriginal,
                    imageUrl: imageUrl
                });
                
                // Show image upload success
                // alert(`✅ Image "${uploadedFile.name}" uploaded successfully!`);
                
            } catch (storageError) {
                console.error('❌ Storage upload error:', storageError);
                
                // Specific storage error handling
                if (storageError.code === 400) {
                    toast.error('❌ Invalid file format. Please check your image file.');
                } else if (storageError.code === 413) {
                    toast.error('❌ File too large. Please choose a smaller image (max 10MB).');
                } else if (storageError.code === 401) {
                    toast.error('❌ Authentication failed. Please refresh and try again.');
                } else if (storageError.code === 403) {
                    toast.error('❌ Permission denied. Unable to upload image.');
                } else if (storageError.message.includes('network') || storageError.message.includes('fetch')) {
                    toast.error('❌ Network error. Please check your connection and try again.');
                } else {
                    toast.error(`❌ Image upload failed: ${storageError.message || 'Unknown storage error'}`);
                }
                throw storageError; // Re-throw to prevent database creation
            }
        }
        
        // Prepare project data
        const projectData = {
            title: data.title?.trim(),
            content: data.content?.trim(),
            projectLink: data.projectLink?.trim(),
            keyFeatures: data.keyFeatures.filter(feature => feature?.trim() !== ''),
            image: imageUrl,
            createdAt: new Date().toISOString()
        };
        
        // Validate required fields
        if (!projectData.title || !projectData.content) {
            throw new Error('Title and content are required fields');
        }
        
        try {
            // Save to database only after successful image upload
            const createdProject = await db.projects.create(projectData);
            
            console.log('✅ Project created successfully:', {
                projectId: createdProject.$id,
                title: createdProject.title
            });
            
            // Success alert with project details
            toast.success(`🎉 Project "${projectData.title}" uploaded successfully!`);
            
            // Reset form after successful submission
            reset();
            
        } catch (databaseError) {
            console.error('❌ Database creation error:', databaseError);
            
            // Specific database error handling
            if (databaseError.code === 400) {
                toast.error('❌ Invalid project data. Please check all fields and try again.');
            } else if (databaseError.code === 401) {
                toast.error('❌ Authentication failed. Please refresh and try again.');
            } else if (databaseError.code === 403) {
                toast.error('❌ Permission denied. Unable to save project.');
            } else if (databaseError.code === 409) {
                toast.error('❌ Project with this title already exists. Please choose a different title.');
            } else if (databaseError.message.includes('network') || databaseError.message.includes('fetch')) {
                toast.error('❌ Network error. Please check your connection and try again.');
            } else {
                toast.error(`❌ Failed to save project: ${databaseError.message || 'Database error occurred'}`);
            }
            throw databaseError;
        }
        
    } catch (error) {
        console.error('❌ General upload error:', error);
        
        // Fallback error handling for uncaught errors
        if (!error.message.includes('upload') && !error.message.includes('save')) {
            if (error.name === 'TypeError') {
                toast.error('❌ Invalid data format. Please check your inputs and try again.');
            } else if (error.name === 'ReferenceError') {
                toast.error('❌ Configuration error. Please contact support.');
            } else {
                toast.error(`❌ Unexpected error occurred: ${error.message || 'Please try again'}`);
            }
        }
        
        // Don't reset form on error to preserve user input
        
    } finally {
        setIsLoading(false);
        console.log('📝 Upload process completed');
    }
};



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Project</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title *
                    </label>
                    <input
                        type="text"
                        {...register('title', { 
                            required: 'Title is required',
                            minLength: { value: 3, message: 'Title must be at least 3 characters' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                {/* Content Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description *
                    </label>
                    <textarea
                        {...register('content', { 
                            required: 'Description is required',
                            minLength: { value: 10, message: 'Description must be at least 10 characters' }
                        })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your project"
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                    )}
                </div>

                {/* Project Link Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Link
                    </label>
                    <input
                        type="url"
                        {...register('projectLink', {
                            pattern: {
                                value: /^https?:\/\/.+/,
                                message: 'Please enter a valid URL'
                            }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com"
                    />
                    {errors.projectLink && (
                        <p className="mt-1 text-sm text-red-600">{errors.projectLink.message}</p>
                    )}
                </div>

                {/* Key Features Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Features
                    </label>
                    <div className="space-y-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <input
                                key={index}
                                type="text"
                                {...register(`keyFeatures.${index}`)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Feature ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Image *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        {...register('image', { validate: validateFile })}
                                        className="sr-only"
                                        accept="image/*"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    {watchedImage && watchedImage[0] && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Selected: {watchedImage[0].name}
                            </p>
                        </div>
                    )}
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </div>
                        ) : (
                            'Upload Project'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUploadForm;
