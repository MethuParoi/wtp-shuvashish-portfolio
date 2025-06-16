'use client';

import { useState, useEffect, use } from 'react';
import { fetchProjects } from '../../../lib/fetchProject';
import { deleteProject, updateProject } from '../../../lib/projectOperations';
import ProjectTableRow from './ProjectTableRow';
import EditProjectModal from './EditProjectModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Search, Plus, Download, Filter, Menu, Eye, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader/Loader';

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const router = useRouter();

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
    window.open(`/project/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
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

  // Filter and pagination logic
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Responsive Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">Projects Management</h2>
          
          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* <button className="inline-flex items-center px-4 py-2 bg-accent text-gray-900 font-medium rounded-lg hover:bg-accent-hover transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button> */}
            <button onClick={() => router.push("/admin/add-project")} className="inline-flex items-center px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-primary-hover transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="inline-flex items-center px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Action Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mb-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex flex-col space-y-2">
              {/* <button className="inline-flex items-center justify-center px-4 py-2 bg-accent text-gray-900 font-medium rounded-lg hover:bg-accent-hover transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button> */}
              <button onClick={() => router.push("/admin/add-project")} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-primary-hover transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </button>
            </div>
          </div>
        )}

        {/* Responsive Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
          {/* <button className="inline-flex items-center justify-center sm:justify-start px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button> */}
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="responsive-table-container">
        {/* Mobile Card View (Hidden on larger screens) */}
        <div className="block md:hidden">
          {currentProjects.map((project, index) => (
            <div key={project.$id} className="border-b border-neutral-200 p-4">
              <div className="flex items-start space-x-3">
                {/* Mobile Project Image */}
                <div className="flex-shrink-0 h-16 w-20 rounded-lg overflow-hidden bg-neutral-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Mobile Project Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{project.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{project.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-gray-900">
                      Active
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleView(project)}
                        className="p-1.5 text-secondary hover:text-secondary-hover hover:bg-secondary-50 rounded"
                        title="View"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-1.5 text-primary hover:text-primary-hover hover:bg-primary-50 rounded"
                        title="Edit"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SNo.
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
      </div>

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
            </div>
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-1 text-sm border rounded ${
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
                className="px-2 sm:px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals remain the same... */}
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
