import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const user = {
    name: "Surya P R",
    role: "NGO",
    email: "surya@blueblock.org"
  };

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-2xl border-b border-blue-800/30 sticky top-0 z-50">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl bg-slate-800/60 border border-blue-800/30 text-blue-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 lg:hidden"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded opacity-90"></div>
              </div>
              <span className="text-lg font-bold text-white hidden sm:block">BlueBlock MRV</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/60 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-blue-300">{user.role}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-blue-800/30 shadow-2xl py-2 z-50"
                  style={{
                    boxShadow: '0 0 40px rgba(30, 58, 138, 0.3)'
                  }}>
                  <div className="px-4 py-3 border-b border-blue-800/30">
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-blue-300">{user.email}</div>
                    <div className="text-xs text-blue-400 mt-1">{user.role}</div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-blue-300 hover:text-white hover:bg-slate-800/60 transition-all duration-300 flex items-center space-x-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;