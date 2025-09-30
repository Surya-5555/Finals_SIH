import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Calendar, MapPin, Users, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, 
  Edit, Trash2, Eye, Download, Share2, BarChart3,
  FileText, Database, Shield, Zap, MoreVertical,
  ChevronDown, ChevronRight, Play, Pause
} from 'lucide-react';
import Navbar from '../components/Layout/NavBar';
import Sidebar from '../components/Layout/SideBar';

const MyProjects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  // Cursor effects
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: 'Sundarbans Mangrove Restoration',
      methodology: 'VM0033',
      status: 'active',
      progress: 75,
      location: 'West Bengal, India',
      area: 2500,
      startDate: '2023-03-15',
      endDate: '2025-12-31',
      carbonCredits: 459,
      revenue: 45230,
      teamMembers: 12,
      lastUpdated: '2024-01-15',
      description: 'Large-scale mangrove restoration project focusing on biodiversity conservation and carbon sequestration in the Sundarbans delta.',
      milestones: [
        { name: 'Site Assessment', completed: true, date: '2023-04-30' },
        { name: 'Community Engagement', completed: true, date: '2023-06-15' },
        { name: 'Initial Planting', completed: true, date: '2023-09-20' },
        { name: 'First Verification', completed: false, date: '2024-03-15' },
        { name: 'Credit Issuance', completed: false, date: '2024-06-30' }
      ],
      risks: ['Monsoon flooding', 'Illegal logging', 'Species competition'],
      documents: 24,
      tasks: { completed: 18, total: 24 }
    },
    {
      id: 2,
      name: 'Gulf of Mannar Seagrass Conservation',
      methodology: 'VM0007',
      status: 'completed',
      progress: 100,
      location: 'Tamil Nadu, India',
      area: 1800,
      startDate: '2022-06-01',
      endDate: '2023-12-31',
      carbonCredits: 330,
      revenue: 32450,
      teamMembers: 8,
      lastUpdated: '2024-01-10',
      description: 'Seagrass bed conservation and restoration project in the Gulf of Mannar biosphere reserve.',
      milestones: [
        { name: 'Baseline Survey', completed: true, date: '2022-07-30' },
        { name: 'Conservation Plan', completed: true, date: '2022-09-15' },
        { name: 'Monitoring Setup', completed: true, date: '2022-11-20' },
        { name: 'Final Verification', completed: true, date: '2023-11-30' },
        { name: 'Credit Issued', completed: true, date: '2023-12-15' }
      ],
      risks: ['Coral bleaching', 'Fishing pressure', 'Water pollution'],
      documents: 18,
      tasks: { completed: 18, total: 18 }
    },
    {
      id: 3,
      name: 'Andaman Coastal Wetlands',
      methodology: 'Gold Standard',
      status: 'planning',
      progress: 25,
      location: 'Andaman Islands, India',
      area: 3200,
      startDate: '2024-02-01',
      endDate: '2026-06-30',
      carbonCredits: 0,
      revenue: 0,
      teamMembers: 6,
      lastUpdated: '2024-01-08',
      description: 'Integrated coastal wetland restoration project combining mangroves, seagrasses, and salt marshes.',
      milestones: [
        { name: 'Feasibility Study', completed: true, date: '2023-12-15' },
        { name: 'Stakeholder Workshop', completed: false, date: '2024-02-28' },
        { name: 'Methodology Approval', completed: false, date: '2024-04-15' },
        { name: 'Implementation Start', completed: false, date: '2024-06-01' }
      ],
      risks: ['Remote location', 'Limited infrastructure', 'Cyclone risk'],
      documents: 8,
      tasks: { completed: 3, total: 12 }
    },
    {
      id: 4,
      name: 'Kerala Backwaters Carbon Project',
      methodology: 'VM0033',
      status: 'active',
      progress: 60,
      location: 'Kerala, India',
      area: 1500,
      startDate: '2023-08-01',
      endDate: '2025-08-31',
      carbonCredits: 215,
      revenue: 21500,
      teamMembers: 10,
      lastUpdated: '2024-01-12',
      description: 'Carbon sequestration through sustainable management of Kerala backwater ecosystems.',
      milestones: [
        { name: 'Community Mapping', completed: true, date: '2023-09-30' },
        { name: 'Ecosystem Assessment', completed: true, date: '2023-11-15' },
        { name: 'Management Plan', completed: true, date: '2024-01-10' },
        { name: 'Implementation', completed: false, date: '2024-03-01' }
      ],
      risks: ['Tourism pressure', 'Water quality issues', 'Land use change'],
      documents: 15,
      tasks: { completed: 9, total: 15 }
    },
    {
      id: 5,
      name: 'Odisha Mangrove Afforestation',
      methodology: 'Plan Vivo',
      status: 'on-hold',
      progress: 40,
      location: 'Odisha, India',
      area: 2800,
      startDate: '2023-05-01',
      endDate: '2025-11-30',
      carbonCredits: 180,
      revenue: 17800,
      teamMembers: 14,
      lastUpdated: '2023-12-20',
      description: 'Community-led mangrove afforestation project in coastal Odisha with focus on livelihood improvement.',
      milestones: [
        { name: 'Site Selection', completed: true, date: '2023-06-15' },
        { name: 'Nursery Setup', completed: true, date: '2023-08-30' },
        { name: 'Initial Planting', completed: false, date: '2024-02-15' },
        { name: 'Community Training', completed: false, date: '2024-04-30' }
      ],
      risks: ['Cyclone damage', 'Community participation', 'Soil salinity'],
      documents: 12,
      tasks: { completed: 6, total: 15 }
    }
  ];

  const statusFilters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'active', label: 'Active', count: projects.filter(p => p.status === 'active').length },
    { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
    { id: 'planning', label: 'Planning', count: projects.filter(p => p.status === 'planning').length },
    { id: 'on-hold', label: 'On Hold', count: projects.filter(p => p.status === 'on-hold').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/40 border-green-700/50';
      case 'completed': return 'text-blue-400 bg-blue-900/40 border-blue-700/50';
      case 'planning': return 'text-yellow-400 bg-yellow-900/40 border-yellow-700/50';
      case 'on-hold': return 'text-red-400 bg-red-900/40 border-red-700/50';
      default: return 'text-gray-400 bg-gray-900/40 border-gray-700/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <TrendingUp className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'on-hold': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowNewProjectModal(true);
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting project:', projectToDelete);
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const ProjectCard = ({ project }) => (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
              {project.name}
            </h3>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(project.status)} flex items-center space-x-1`}>
              {getStatusIcon(project.status)}
              <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </span>
          </div>
          <p className="text-blue-400 text-sm mb-3">{project.methodology} Methodology</p>
          <p className="text-blue-300 text-sm line-clamp-2">{project.description}</p>
        </div>
        <div className="relative">
          <button className="p-2 text-blue-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-blue-300">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{project.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-300">
          <Users className="w-4 h-4" />
          <span className="text-sm">{project.teamMembers} members</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-300">
          <FileText className="w-4 h-4" />
          <span className="text-sm">{project.documents} documents</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{project.startDate}</span>
        </div>
      </div>

      {/* Progress and Metrics */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Progress</span>
          <span className="text-white font-semibold">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-300">Carbon Credits</span>
            <span className="text-white font-semibold">{project.carbonCredits} tCO₂e</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-300">Revenue</span>
            <span className="text-white font-semibold">${project.revenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleViewProject(project.id)}
          className="flex-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50 flex items-center justify-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button
          onClick={() => handleEditProject(project)}
          className="flex-1 bg-slate-800/60 hover:bg-slate-700/60 text-blue-300 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50 flex items-center justify-center"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={() => handleDeleteProject(project)}
          className="px-3 bg-slate-800/60 hover:bg-red-900/40 text-blue-300 hover:text-red-300 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-800/30 hover:border-red-500/50 flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-blue-900/20 border border-blue-700/30">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{projects.length}</h3>
        <p className="text-blue-300 text-sm">Total Projects</p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/30">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">
          {projects.reduce((sum, project) => sum + project.carbonCredits, 0).toLocaleString()}
        </h3>
        <p className="text-blue-300 text-sm">Total Carbon Credits</p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-700/30">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">
          ${projects.reduce((sum, project) => sum + project.revenue, 0).toLocaleString()}
        </h3>
        <p className="text-blue-300 text-sm">Total Revenue</p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-cyan-900/20 border border-cyan-700/30">
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">
          {projects.reduce((sum, project) => sum + project.teamMembers, 0)}
        </h3>
        <p className="text-blue-300 text-sm">Team Members</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/30 to-indigo-900/30 animate-pulse"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Cursor Effects */}
      <div 
        ref={glowRef}
        className="fixed w-96 h-96 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(4px)'
        }}
      />
      
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 border-2 border-blue-400 rounded-full pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/30"
        style={{
          boxShadow: '0 0 15px rgba(96, 165, 250, 0.4), inset 0 0 15px rgba(96, 165, 250, 0.2)'
        }}
      />

      {/* Layout */}
      <div className="flex h-screen relative z-30">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            isSidebarOpen={sidebarOpen}
          />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    My Projects
                  </h1>
                  <p className="text-blue-300 text-lg">
                    Manage and monitor your carbon credit projects
                  </p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="mt-4 lg:mt-0 flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Project
                </button>
              </div>

              {/* Quick Stats */}
              <QuickStats />

              {/* Filters and Search */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Status Filters */}
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          activeFilter === filter.id
                            ? 'bg-blue-900/40 text-white border border-blue-700/50'
                            : 'text-blue-300 hover:text-white hover:bg-slate-800/60 border border-blue-800/30'
                        }`}
                      >
                        {filter.label} ({filter.count})
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-800/60 border border-blue-800/30 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 w-64"
                      />
                    </div>
                    <button className="p-2 bg-slate-800/60 border border-blue-800/30 rounded-xl text-blue-400 hover:text-white hover:border-blue-500/50 transition-all duration-300">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-12 border border-blue-800/30">
                    <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                    <p className="text-blue-300 mb-6">
                      {searchQuery ? 'Try adjusting your search terms or filters' : 'Get started by creating your first project'}
                    </p>
                    <button
                      onClick={() => setShowNewProjectModal(true)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create New Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            {/* Add project form content here */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-6 py-3 bg-slate-800/60 text-blue-300 hover:text-white rounded-xl font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                {selectedProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && projectToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 border border-red-800/30 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Delete Project</h2>
            </div>
            <p className="text-blue-300 mb-6">
              Are you sure you want to delete <strong className="text-white">{projectToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 bg-slate-800/60 text-blue-300 hover:text-white rounded-xl font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;