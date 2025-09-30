import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  const storedProfile = (() => {
    try {
      return JSON.parse(localStorage.getItem('bb_profile')) || null;
    } catch {
      return null;
    }
  })();

  const user = storedProfile || {
    name: "User",
    role: "NGO",
    email: "user@example.com"
  };

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notificationsData = [
    { id: 1, title: 'Project updated', message: 'Sundarbans project progress is now 80%', time: '5m', type: 'info', read: false },
    { id: 2, title: 'New message', message: 'Admin commented on your report', time: '1h', type: 'success', read: false },
    { id: 3, title: 'Maintenance', message: 'System maintenance at 22:00 UTC', time: '2h', type: 'warning', read: true }
  ];

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: 'en'
  });

  const NotificationsPanel = () => (
    <div ref={notificationsRef} className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-blue-800/30 shadow-2xl z-50">
      <div className="p-4 border-b border-blue-800/30 flex items-center justify-between">
        <h3 className="text-white font-semibold">Notifications</h3>
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{notificationsData.filter(n=>!n.read).length} new</span>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notificationsData.map(n => (
          <div key={n.id} className={`p-4 border-b border-blue-800/20 ${!n.read ? 'bg-blue-500/10' : ''}` }>
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${n.type==='success'?'bg-green-500':n.type==='warning'?'bg-yellow-500':'bg-blue-500'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-sm font-medium truncate">{n.title}</h4>
                  <span className="text-blue-300 text-xs ml-2 flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-blue-300 text-xs mt-1 truncate">{n.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
        <button className="w-full text-center text-blue-300 hover:text-white text-sm">Mark all as read</button>
      </div>
    </div>
  );

  const SettingsPanel = () => (
    <div ref={settingsRef} className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-blue-800/30 shadow-2xl z-50">
      <div className="p-4 border-b border-blue-800/30">
        <h3 className="text-white font-semibold">Settings</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-blue-300 text-sm">Email notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.emailNotifications} onChange={e=>setSettings(prev=>({...prev,emailNotifications:e.target.checked}))} />
            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-300 text-sm">Push notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.pushNotifications} onChange={e=>setSettings(prev=>({...prev,pushNotifications:e.target.checked}))} />
            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
        <div>
          <label className="text-blue-300 text-sm block mb-2">Language</label>
          <select value={settings.language} onChange={e=>setSettings(prev=>({...prev,language:e.target.value}))} className="w-full bg-slate-800 border border-blue-800/30 rounded-lg px-3 py-2 text-white text-sm">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      <div className="p-4 border-t border-blue-800/30">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">Save</button>
      </div>
    </div>
  );

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
              <span className="text-lg font-bold text-white hidden sm:block">BlueBlock MRV</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setSettingsOpen(false); }}
                className="relative p-2 rounded-xl bg-slate-800/60 border border-blue-800/30 text-blue-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
              >
                🔔
                {notificationsData.filter(n=>!n.read).length>0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationsData.filter(n=>!n.read).length}
                  </span>
                )}
              </button>
              {notificationsOpen && <NotificationsPanel />}
            </div>

            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => { setSettingsOpen(!settingsOpen); setNotificationsOpen(false); }}
                className="p-2 rounded-xl bg-slate-800/60 border border-blue-800/30 text-blue-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
              >
                ⚙️
              </button>
              {settingsOpen && <SettingsPanel />}
            </div>
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