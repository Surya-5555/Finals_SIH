import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarMenu } from '../../data/dashboardData';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-slate-900/80 backdrop-blur-2xl border-r border-blue-800/30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User Profile Section */}
        <div className="p-6 border-b border-blue-800/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-lg opacity-90"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Surya P R</h2>
              <p className="text-sm text-blue-300">NGO</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {sidebarMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-blue-900/40 text-white border border-blue-700/50 shadow-lg' 
                  : 'text-blue-300 hover:text-white hover:bg-slate-800/60'
                }
              `}
              style={({ isActive }) => ({
                boxShadow: isActive ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
              })}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;