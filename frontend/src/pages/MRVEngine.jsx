import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, RefreshCw, Upload, Download, Settings, 
  BarChart3, FileText, Clock, CheckCircle, AlertTriangle,
  Cpu, Database, Shield, Zap, Cloud, Server, Activity,
  TrendingUp, Eye, Filter, Search, Calendar, Users
} from 'lucide-react';
import Navbar from '../components/Layout/NavBar';
import Sidebar from '../components/Layout/SideBar';

const MRVEngine = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('monitoring');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
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

  // Mock data for demonstration
  const projects = [
    {
      id: 1,
      name: 'Sundarbans Mangrove Restoration',
      methodology: 'VM0033',
      status: 'active',
      lastProcessed: '2024-01-15',
      carbonCredits: 459,
      accuracy: 94.5,
      dataPoints: 12500,
      progress: 75
    },
    {
      id: 2,
      name: 'Gulf of Mannar Seagrass',
      methodology: 'VM0007',
      status: 'completed',
      lastProcessed: '2024-01-14',
      carbonCredits: 330,
      accuracy: 96.2,
      dataPoints: 8900,
      progress: 100
    },
    {
      id: 3,
      name: 'Andaman Coastal Wetlands',
      methodology: 'Gold Standard',
      status: 'processing',
      lastProcessed: '2024-01-13',
      carbonCredits: 215,
      accuracy: 91.8,
      dataPoints: 6700,
      progress: 45
    }
  ];

  const systemMetrics = {
    uptime: '99.8%',
    processingSpeed: '2.4 TB/hour',
    activeProjects: 8,
    totalCalculations: '1.2M',
    dataAccuracy: '95.7%',
    apiCalls: '45.2K'
  };

  const recentActivities = [
    { id: 1, project: 'Sundarbans Mangrove', action: 'Data Processing', status: 'completed', timestamp: '2 hours ago' },
    { id: 2, project: 'Gulf of Mannar', action: 'Quality Check', status: 'completed', timestamp: '4 hours ago' },
    { id: 3, project: 'Andaman Wetlands', action: 'Satellite Data Sync', status: 'processing', timestamp: '6 hours ago' },
    { id: 4, project: 'All Projects', action: 'System Backup', status: 'completed', timestamp: '1 day ago' }
  ];

  const handleProcessData = async (projectId = null) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setFeedbackType('success');
          setFeedbackMessage(projectId ? 
            `Project data processed successfully!` : 
            `All projects processed successfully!`
          );
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleRunAnalysis = (projectId) => {
    setSelectedProject(projects.find(p => p.id === projectId));
    setFeedbackType('info');
    setFeedbackMessage('Running advanced carbon analysis...');
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleGenerateReport = (projectId) => {
    setFeedbackType('success');
    setFeedbackMessage('Report generation started. Download will begin shortly.');
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  // Professional form components with dark theme styling
  const MetricCard = ({ title, value, icon, color = 'blue', trend }) => (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-900/20 border border-${color}-700/30`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs px-2 py-1 rounded-lg ${
            trend > 0 ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${trend > 0 ? '' : 'rotate-180'}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-blue-300 text-sm">{title}</p>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-blue-400 text-sm">{project.methodology} Methodology</p>
        </div>
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
          project.status === 'active' ? 'bg-green-900/40 text-green-400 border border-green-700/50' :
          project.status === 'processing' ? 'bg-blue-900/40 text-blue-400 border border-blue-700/50' :
          'bg-gray-900/40 text-gray-400 border border-gray-700/50'
        }`}>
          {project.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Carbon Credits</span>
          <span className="text-white font-semibold">{project.carbonCredits} tCO₂e</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Data Accuracy</span>
          <span className="text-white font-semibold">{project.accuracy}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Data Points</span>
          <span className="text-white font-semibold">{project.dataPoints.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-blue-300 mb-2">
          <span>Processing Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleRunAnalysis(project.id)}
          className="flex-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50 flex items-center justify-center"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analyze
        </button>
        <button
          onClick={() => handleGenerateReport(project.id)}
          className="flex-1 bg-slate-800/60 hover:bg-slate-700/60 text-blue-300 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50 flex items-center justify-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Report
        </button>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-4 p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300">
      <div className={`p-2 rounded-lg ${
        activity.status === 'completed' ? 'bg-green-900/20 text-green-400' :
        activity.status === 'processing' ? 'bg-blue-900/20 text-blue-400' :
        'bg-yellow-900/20 text-yellow-400'
      }`}>
        {activity.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
         activity.status === 'processing' ? <RefreshCw className="w-4 h-4 animate-spin" /> :
         <AlertTriangle className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-sm font-medium">{activity.action}</h4>
          <span className="text-blue-400 text-xs">{activity.timestamp}</span>
        </div>
        <p className="text-blue-300 text-xs">{activity.project}</p>
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

      {/* Feedback Notification */}
      {showFeedback && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl border ${
            feedbackType === 'success' 
              ? 'bg-emerald-900/90 border-emerald-600 text-emerald-100' 
              : feedbackType === 'error'
              ? 'bg-red-900/90 border-red-700 text-red-100'
              : 'bg-blue-900/90 border-blue-600 text-blue-100'
          }`} style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
          }}>
            {feedbackMessage}
          </div>
        </div>
      )}

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
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  MRV Engine Dashboard
                </h1>
                <p className="text-blue-300 text-lg">
                  Advanced Monitoring, Reporting, and Verification System
                </p>
              </div>

              {/* Control Panel */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleProcessData()}
                      disabled={isProcessing}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-5 h-5 mr-2" />
                      )}
                      {isProcessing ? 'Processing...' : 'Process All Data'}
                    </button>
                    
                    <button className="flex items-center px-6 py-3 bg-slate-800/60 text-blue-300 hover:text-white rounded-xl font-medium hover:bg-slate-700/60 transition-all duration-300 border border-blue-800/30 hover:border-blue-500/50">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Data
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-blue-300">
                      <Server className="w-5 h-5" />
                      <span className="text-sm">System Status: <span className="text-green-400 font-semibold">Operational</span></span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-300">
                      <Database className="w-5 h-5" />
                      <span className="text-sm">Storage: <span className="text-white font-semibold">78%</span></span>
                    </div>
                  </div>
                </div>

                {/* Processing Progress */}
                {isProcessing && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-blue-300 mb-2">
                      <span>Processing Data...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300"
                        style={{ width: `${processingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <MetricCard 
                  title="System Uptime"
                  value={systemMetrics.uptime}
                  icon={<Server className="w-6 h-6 text-green-400" />}
                  color="green"
                  trend={0.2}
                />
                <MetricCard 
                  title="Processing Speed"
                  value={systemMetrics.processingSpeed}
                  icon={<Zap className="w-6 h-6 text-blue-400" />}
                  color="blue"
                  trend={5.1}
                />
                <MetricCard 
                  title="Active Projects"
                  value={systemMetrics.activeProjects}
                  icon={<Activity className="w-6 h-6 text-purple-400" />}
                  color="purple"
                  trend={12.5}
                />
                <MetricCard 
                  title="Total Calculations"
                  value={systemMetrics.totalCalculations}
                  icon={<Cpu className="w-6 h-6 text-cyan-400" />}
                  color="cyan"
                />
                <MetricCard 
                  title="Data Accuracy"
                  value={systemMetrics.dataAccuracy}
                  icon={<Shield className="w-6 h-6 text-emerald-400" />}
                  color="emerald"
                  trend={1.3}
                />
                <MetricCard 
                  title="API Calls (24h)"
                  value={systemMetrics.apiCalls}
                  icon={<Cloud className="w-6 h-6 text-indigo-400" />}
                  color="indigo"
                />
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-2 border border-blue-800/30 mb-6">
                {['monitoring', 'analytics', 'reports', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-blue-900/40 text-white border border-blue-700/50'
                        : 'text-blue-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Projects List */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Active Projects</h2>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10 pr-4 py-2 bg-slate-800/60 border border-blue-800/30 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        </div>
                        <button className="p-2 bg-slate-800/60 border border-blue-800/30 rounded-lg text-blue-400 hover:text-white hover:border-blue-500/50 transition-all duration-300">
                          <Filter className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Recent Activities & Quick Actions */}
                <div className="space-y-6">
                  {/* Recent Activities */}
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      {recentActivities.map(activity => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-800/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 text-blue-300 hover:text-white transition-all duration-300 group">
                        <div className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-3" />
                          <span>Run System Diagnostics</span>
                        </div>
                        <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 text-blue-300 hover:text-white transition-all duration-300 group">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-3" />
                          <span>Generate Summary Report</span>
                        </div>
                        <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-blue-800/30 hover:border-blue-500/50 text-blue-300 hover:text-white transition-all duration-300 group">
                        <div className="flex items-center">
                          <Settings className="w-5 h-5 mr-3" />
                          <span>Engine Configuration</span>
                        </div>
                        <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MRVEngine;