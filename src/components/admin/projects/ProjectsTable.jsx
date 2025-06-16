'use client';

import { useState, useEffect } from 'react';
import { fetchProjects } from '../../../lib/fetchProject';
import { deleteProject, updateProject } from '../../../lib/projectOperations';
import ProjectTableRow from './ProjectTableRow';
import EditProjectModal from './EditProjectModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Search, Plus, Download, Filter } from 'lucide-react';

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleView = (project) => {
    window.open(`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  const confirmDelete = async () => {
    if (selectedProject) {
      try {
        await deleteProject(selectedProject.$id);
        setProjects(projects.filter(p => p.$id !== selectedProject.$id));
        setShowDeleteModal(false);
        setSelectedProject(null);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleUpdateProject = async (updatedData) => {
    try {
      const updatedProject = await updateProject(selectedProject.$id, updatedData);
      setProjects(projects.map(p => p.$id === selectedProject.$id ? updatedProject : p));
      setShowEditModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Projects Management</h2>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-accent text-gray-900 font-medium rounded-lg hover:bg-accent-hover transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-primary-hover transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SNo.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {currentProjects.map((project, index) => (
              <ProjectTableRow
                key={project.$id}
                project={project}
                serialNumber={indexOfFirstProject + index + 1}
                onView={() => handleView(project)}
                onEdit={() => handleEdit(project)}
                onDelete={() => handleDelete(project)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm border rounded ${
                        currentPage === page
                          ? 'bg-primary text-gray-900 border-primary'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showEditModal && (
        <EditProjectModal
          project={selectedProject}
          onSave={handleUpdateProject}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProject(null);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          project={selectedProject}
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
