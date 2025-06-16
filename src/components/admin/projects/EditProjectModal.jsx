'use client';

import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { uploadFile } from '../../../lib/storage';

export default function EditProjectModal({ project, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    projectLink: '',
    keyFeatures: ['', '', '', '', ''],
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        content: project.content || '',
        projectLink: project.projectLink || '',
        keyFeatures: project.keyFeatures || ['', '', '', '', ''],
        image: project.image || ''
      });
      setImagePreview(project.image || null);
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyFeatureChange = (index, value) => {
    const newKeyFeatures = [...formData.keyFeatures];
    newKeyFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      keyFeatures: newKeyFeatures
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const uploadedFile = await uploadFile(imageFile);
        const bucketId = uploadedFile.bucketId;
        const fileId = uploadedFile.$id;
        const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
        
        imageUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
      }

      const updatedData = {
        ...formData,
        image: imageUrl,
        keyFeatures: formData.keyFeatures.filter(feature => feature.trim() !== '')
      };

      await onSave(updatedData);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Link
            </label>
            <input
              type="url"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Key Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Features
            </label>
            <div className="space-y-2">
              {formData.keyFeatures.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  value={feature}
                  onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image
            </label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="w-32 h-24 rounded-lg overflow-hidden border border-neutral-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose New Image
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
