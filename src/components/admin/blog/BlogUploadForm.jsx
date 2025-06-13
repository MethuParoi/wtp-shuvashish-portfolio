'use client';

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import RichTextEditor from './JoditEditor';
import db from '../../../lib/databases';
import { toast } from 'react-toastify';

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
            featuredImage: '',
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

    const onSubmit = async (data) => {
        setIsLoading(true);
        
        try {
            // Auto-generate slug if not provided
            const slug = data.slug || generateSlug(data.title);
            
            // Prepare blog data
            const blogData = {
                title: data.title.trim(),
                content: data.content,
                excerpt: data.excerpt.trim(),
                author: data.author.trim(),
                slug: slug,
                tags: data.tags,
                featuredImage: data.featuredImage.trim(),
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
            alert(`❌ Unexpected error: ${error.message}`);
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
                <div>
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
