'use client';

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import RichTextEditor from './JoditEditor';
import db from '../../../lib/databases';
import { toast } from 'react-toastify';
import storageService from '../../../lib/storage';

const BlogUploadForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            author: '',
            slug: '',
            tags: '',
            image: null,
            isPublished: false
        }
    });

    // Auto-generate slug from title
    const watchedTitle = watch('title');
    
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const watchedImage = watch('image');

    // Validate file upload
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

    const onSubmit = async (data) => {
        setIsLoading(true);
        
        try {
            // Auto-generate slug if not provided
            const slug = data.slug || generateSlug(data.title);

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
                            
                            // console.log('✅ Image uploaded successfully:', {
                            //     fileId: uploadedFile.$id,
                            //     fileName: uploadedFile.name,
                            //     fileSize: uploadedFile.sizeOriginal,
                            //     imageUrl: imageUrl
                            // });
                            
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
            
            // Prepare blog data
            const blogData = {
                title: data.title.trim(),
                content: data.content,
                excerpt: data.excerpt.trim(),
                author: data.author.trim(),
                slug: slug,
                tags: data.tags,
                featuredImage: imageUrl,
                // featuredImage: data.featuredImage.trim(),
                isPublished: data.isPublished,
                publishedAt: data.isPublished ? new Date().toISOString() : null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            // Validate required fields
            if (!blogData.title || !blogData.content || !blogData.author) {
                throw new Error('Title, content, and author are required fields');
            }
            
            try {
                // Save to database
                const createdBlog = await db.blogs.create(blogData);
                
                console.log('✅ Blog created successfully:', {
                    blogId: createdBlog.$id,
                    title: createdBlog.title,
                    slug: createdBlog.slug
                });
                
                toast.success(`🎉 Blog "${blogData.title}" ${blogData.isPublished ? 'published' : 'saved as draft'} successfully!`);
                
                reset();
                
            } catch (databaseError) {
                console.error('❌ Database creation error:', databaseError);
                
                if (databaseError.code === 409) {
                    toast.error('❌ A blog with this slug already exists. Please choose a different title or slug.');
                } else if (databaseError.message.includes('databaseId')) {
                    toast.error('❌ Database configuration error. Please check your environment settings.');
                } else {
                    toast.error(`❌ Failed to save blog: ${databaseError.message || 'Database error occurred'}`);
                }
                throw databaseError;
            }
            
        } catch (error) {
            console.error('❌ Blog creation error:', error);
            toast.error(`❌ Unexpected error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog Post</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Title *
                    </label>
                    <input
                        type="text"
                        {...register('title', { 
                            required: 'Title is required',
                            minLength: { value: 5, message: 'Title must be at least 5 characters' },
                            maxLength: { value: 255, message: 'Title must be less than 255 characters' }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your blog title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                {/* Slug Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                    </label>
                    <input
                        type="text"
                        {...register('slug', {
                            pattern: {
                                value: /^[a-z0-9-]+$/,
                                message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                            }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={watchedTitle ? generateSlug(watchedTitle) : "auto-generated-from-title"}
                    />
                    {errors.slug && (
                        <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from title</p>
                </div>

                {/* Author Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author *
                    </label>
                    <input
                        type="text"
                        {...register('author', { 
                            required: 'Author is required',
                            minLength: { value: 2, message: 'Author name must be at least 2 characters' }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter author name"
                    />
                    {errors.author && (
                        <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                    )}
                </div>

                {/* Excerpt Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt
                    </label>
                    <textarea
                        {...register('excerpt', {
                            maxLength: { value: 500, message: 'Excerpt must be less than 500 characters' }
                        })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of your blog post"
                    />
                    {errors.excerpt && (
                        <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                    )}
                </div>

                {/* Rich Text Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Content *
                    </label>
                    <Controller
                        name="content"
                        control={control}
                        rules={{ 
                            required: 'Content is required',
                            minLength: { value: 50, message: 'Content must be at least 50 characters' }
                        }}
                        render={({ field }) => (
                            <RichTextEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Write your blog content here..."
                            />
                        )}
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                    )}
                </div>

                {/* Tags Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        {...register('tags')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="technology, web development, react (comma-separated)"
                    />
                    <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
                </div>

                {/* Featured Image URL */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image URL
                    </label>
                    <input
                        type="url"
                        {...register('featuredImage', {
                            pattern: {
                                value: /^https?:\/\/.+/,
                                message: 'Please enter a valid URL'
                            }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                    />
                    {errors.featuredImage && (
                        <p className="mt-1 text-sm text-red-600">{errors.featuredImage.message}</p>
                    )}
                </div> */}

                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Image (Optional)
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
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 mx-auto">
                                    <span className=''>Upload a file</span>
                                    <input
                                        type="file"
                                        {...register('image', { validate: validateFile })}
                                        className="sr-only"
                                        accept="image/*"
                                    />
                                </label>
                                {/* <p className="pl-1">or drag and drop</p> */}
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

                {/* Publish Status */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isPublished"
                        {...register('isPublished')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                        Publish immediately
                    </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Blog...
                            </div>
                        ) : (
                            'Create Blog Post'
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogUploadForm;
