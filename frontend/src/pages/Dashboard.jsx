import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Layout/NavBar';
import Sidebar from '../components/Layout/SideBar';
import StatsCard from '../components/Dashboard/StatsCard';
import ProjectCard from '../components/Dashboard/ProjectCard';
import QuickAction from '../components/Dashboard/QuickAction';
import { statsData, projectsData, quickActions } from '../data/dashboardData';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clickedElements, setClickedElements] = useState(new Set());
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  const handleElementClick = (elementId) => {
    setClickedElements(prev => new Set([...prev, elementId]));
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/30 to-indigo-900/30 animate-pulse"></div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(96, 165, 250, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
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
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back, Surya P R
                </h1>
                <p className="text-blue-300 text-lg">
                  Track your blue carbon projects and methodologies.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                  <div 
                    key={index}
                    onClick={() => handleElementClick(`stat-${index}`)}
                  >
                    <StatsCard {...stat} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Projects Section */}
                <div className="xl:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">My Projects</h2>
                    <button className="text-blue-400 hover:text-white text-sm font-medium transition-colors duration-300">
                      View All →
                    </button>
                  </div>

                  <div className="space-y-6">
                    {projectsData.map((project) => (
                      <div 
                        key={project.id}
                        onClick={() => handleElementClick(`project-${project.id}`)}
                      >
                        <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                  <div className="space-y-6">
                    {quickActions.map((action, index) => (
                      <div 
                        key={index}
                        onClick={() => handleElementClick(`action-${index}`)}
                      >
                        <QuickAction {...action} />
                      </div>
                    ))}
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

export default Dashboard;