import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Layout/NavBar';
import Sidebar from '../components/Layout/SideBar';
import MethodologiesGrid from '../components/Methodologies/MethodologiesGrid';

const Methodologies = () => {
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
              {/* Header Section */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Professional Carbon Credit Solutions
                </h1>
                <p className="text-xl text-blue-300 max-w-4xl mx-auto leading-relaxed">
                  Each methodology is designed with specific requirements and comprehensive terms. 
                  Select the methodology that aligns perfectly with your project objectives and applicable requirements.
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-800/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-900/80 px-6 py-2 text-blue-300 rounded-xl backdrop-blur-sm text-sm font-semibold">
                    Available Methodologies
                  </span>
                </div>
              </div>

              {/* Methodologies Grid */}
              <div 
                onClick={() => handleElementClick('methodologies-grid')}
              >
                <MethodologiesGrid />
              </div>

              {/* Bottom Section */}
              <div className="mt-16 text-center">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-800/30">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Need Assistance?
                  </h3>
                  <p className="text-blue-300 mb-6 max-w-2xl mx-auto">
                    Our team of carbon credit experts is available to help you select the right methodology 
                    and guide you through the implementation process.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-blue-500/50">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Methodologies;