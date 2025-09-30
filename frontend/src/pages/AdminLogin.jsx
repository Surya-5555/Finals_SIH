import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [clickedElements, setClickedElements] = useState(new Set());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  // Read profile
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('bb_profile')) || null; } catch { return null; }
  })();

  // Guard: only admins allowed
  useEffect(() => {
    if (!profile || profile.role !== 'admin') {
      navigate('/dashboard');
    }
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('bb_profile'); } catch {}
    navigate('/login');
  };

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

  // Mock data
  const statsData = [
    {
      title: "Total Projects",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: "📊"
    },
    {
      title: "Active Users",
      value: "8,542",
      change: "+5%",
      trend: "up",
      icon: "👥"
    },
    {
      title: "Carbon Credits",
      value: "2.4M",
      change: "+18%",
      trend: "up",
      icon: "🌿"
    },
    {
      title: "Transactions",
      value: "45.2K",
      change: "+8%",
      trend: "up",
      icon: "💸"
    }
  ];

  const projectsData = [
    {
      id: 1,
      name: "Mangrove Restoration - Indonesia",
      progress: 75,
      credits: "450K",
      status: "active",
      location: "Indonesia"
    },
    {
      id: 2,
      name: "Seagrass Conservation - Australia",
      progress: 90,
      credits: "320K",
      status: "completed",
      location: "Australia"
    },
    {
      id: 3,
      name: "Tidal Marsh - USA",
      progress: 45,
      credits: "180K",
      status: "active",
      location: "United States"
    }
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new carbon credit project",
      icon: "➕",
      action: () => setActiveTab('projects')
    },
    {
      title: "Generate Report",
      description: "Create system performance report",
      icon: "📈",
      action: () => setActiveTab('reports')
    },
    {
      title: "User Management",
      description: "Manage system users and permissions",
      icon: "👥",
      action: () => setActiveTab('users')
    }
  ];

  const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Project Manager", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "Inactive", joinDate: "2024-03-10" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Analyst", status: "Active", joinDate: "2024-01-30" }
  ];

  const carbonCreditsData = [
    { id: 1, project: "Mangrove Indonesia", credits: "100,000", price: "$15.20", status: "Available", date: "2024-06-01" },
    { id: 2, project: "Seagrass Australia", credits: "75,000", price: "$14.80", status: "Sold", date: "2024-05-28" },
    { id: 3, project: "Tidal Marsh USA", credits: "50,000", price: "$16.50", status: "Available", date: "2024-06-02" },
    { id: 4, project: "Coastal Wetland India", credits: "120,000", price: "$13.90", status: "Reserved", date: "2024-05-30" }
  ];

  const blockchainData = [
    { hash: "0x1a2b3c...", from: "0xabc123...", to: "0xdef456...", credits: "25,000", value: "$375,000", timestamp: "2024-06-15 14:30:22" },
    { hash: "0x4d5e6f...", from: "0xghi789...", to: "0xjkl012...", credits: "10,000", value: "$148,000", timestamp: "2024-06-15 13:15:45" },
    { hash: "0x7a8b9c...", from: "0xdef456...", to: "0xmno345...", credits: "50,000", value: "$825,000", timestamp: "2024-06-15 11:45:12" }
  ];

  const notificationsData = [
    {
      id: 1,
      title: "New User Registration",
      message: "Mike Johnson registered as a new user",
      time: "5 minutes ago",
      type: "info",
      read: false
    },
    {
      id: 2,
      title: "Project Completed",
      message: "Seagrass Conservation Australia reached 100% completion",
      time: "1 hour ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "System Update",
      message: "Scheduled maintenance in 2 hours",
      time: "2 hours ago",
      type: "warning",
      read: true
    },
    {
      id: 4,
      title: "Credit Transaction",
      message: "Large transaction of 50,000 credits completed",
      time: "3 hours ago",
      type: "info",
      read: true
    }
  ];

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: true,
    language: 'en',
    timezone: 'UTC+0',
    theme: 'dark'
  });

  const StatsCard = ({ title, value, change, trend }) => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            <span className="text-sm font-medium">{change}</span>
            <span className="ml-1 text-xs">this month</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
        }`}>
          {project.status}
        </span>
      </div>
      <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
        <span>📍 {project.location}</span>
        <span>🌿 {project.credits} Credits</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-slate-400 text-sm mt-2">
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, action }) => (
    <div 
      className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
      onClick={action}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );

  const NotificationsPanel = () => (
    <div ref={notificationsRef} className="absolute right-0 top-full mt-2 w-80 bg-slate-800/95 backdrop-blur-lg rounded-xl border border-slate-700/50 shadow-2xl z-50">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {notificationsData.filter(n => !n.read).length} new
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notificationsData.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200 ${
              !notification.read ? 'bg-blue-500/10' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                <p className="text-slate-400 text-xs mt-1">{notification.message}</p>
                <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
          Mark all as read
        </button>
      </div>
    </div>
  );

  const SettingsPanel = () => (
    <div ref={settingsRef} className="absolute right-0 top-full mt-2 w-96 bg-slate-800/95 backdrop-blur-lg rounded-xl border border-slate-700/50 shadow-2xl z-50">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Settings</h3>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-4">Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings(prev => ({...prev, emailNotifications: e.target.checked}))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => setSettings(prev => ({...prev, pushNotifications: e.target.checked}))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Security</h4>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Two-Factor Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => setSettings(prev => ({...prev, twoFactorAuth: e.target.checked}))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Preferences</h4>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({...prev, timezone: e.target.value}))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="UTC+0">UTC+0</option>
                  <option value="UTC+1">UTC+1</option>
                  <option value="UTC+2">UTC+2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-slate-700">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400 font-medium">Name</th>
              <th className="text-left py-3 text-slate-400 font-medium">Email</th>
              <th className="text-left py-3 text-slate-400 font-medium">Role</th>
              <th className="text-left py-3 text-slate-400 font-medium">Status</th>
              <th className="text-left py-3 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors duration-200">
                <td className="py-3 text-white">{user.name}</td>
                <td className="py-3 text-slate-400">{user.email}</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                    {user.role}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-blue-400 hover:text-blue-300 text-sm mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SystemReports = () => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">System Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <h3 className="text-white font-semibold mb-2">Performance</h3>
          <p className="text-slate-400 text-sm">System uptime and response metrics</p>
          <button className="mt-3 text-blue-400 hover:text-blue-300 text-sm">Generate Report</button>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <h3 className="text-white font-semibold mb-2">Security</h3>
          <p className="text-slate-400 text-sm">Access logs and security events</p>
          <button className="mt-3 text-blue-400 hover:text-blue-300 text-sm">Generate Report</button>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <h3 className="text-white font-semibold mb-2">Financial</h3>
          <p className="text-slate-400 text-sm">Revenue and transaction reports</p>
          <button className="mt-3 text-blue-400 hover:text-blue-300 text-sm">Generate Report</button>
        </div>
      </div>
    </div>
  );

  const MarketSpace = () => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Carbon Credits Marketplace</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          List New Credits
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400 font-medium">Project</th>
              <th className="text-left py-3 text-slate-400 font-medium">Credits</th>
              <th className="text-left py-3 text-slate-400 font-medium">Price</th>
              <th className="text-left py-3 text-slate-400 font-medium">Status</th>
              <th className="text-left py-3 text-slate-400 font-medium">Date</th>
              <th className="text-left py-3 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carbonCreditsData.map(credit => (
              <tr key={credit.id} className="border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors duration-200">
                <td className="py-3 text-white">{credit.project}</td>
                <td className="py-3 text-slate-400">{credit.credits}</td>
                <td className="py-3 text-green-400 font-medium">{credit.price}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    credit.status === 'Available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : credit.status === 'Sold'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {credit.status}
                  </span>
                </td>
                <td className="py-3 text-slate-400">{credit.date}</td>
                <td className="py-3">
                  <button className="text-blue-400 hover:text-blue-300 text-sm mr-3">View</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Trade</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BlockchainTransactions = () => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Blockchain Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400 font-medium">Transaction Hash</th>
              <th className="text-left py-3 text-slate-400 font-medium">From</th>
              <th className="text-left py-3 text-slate-400 font-medium">To</th>
              <th className="text-left py-3 text-slate-400 font-medium">Credits</th>
              <th className="text-left py-3 text-slate-400 font-medium">Value</th>
              <th className="text-left py-3 text-slate-400 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {blockchainData.map((tx, index) => (
              <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors duration-200">
                <td className="py-3 text-blue-400 font-mono text-sm">{tx.hash}</td>
                <td className="py-3 text-slate-400 font-mono text-sm">{tx.from}</td>
                <td className="py-3 text-slate-400 font-mono text-sm">{tx.to}</td>
                <td className="py-3 text-green-400">{tx.credits}</td>
                <td className="py-3 text-green-400 font-medium">{tx.value}</td>
                <td className="py-3 text-slate-400">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Sidebar = ({ isOpen, onClose }) => (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <span className="text-xl font-bold text-white">Admin</span>
            <button 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'overview', label: 'Dashboard Overview' },
              { id: 'users', label: 'User Management' },
              { id: 'reports', label: 'System Reports' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'blockchain', label: 'Blockchain' },
              { id: 'projects', label: 'All Projects' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{profile?.name || 'Admin'}</p>
                <p className="text-slate-400 text-sm truncate">{profile?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const Navbar = ({ onToggleSidebar, isSidebarOpen }) => (
    <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <h1 className="text-xl font-bold text-white">
            {activeTab === 'overview' && 'Admin Dashboard'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'reports' && 'System Reports'}
            {activeTab === 'marketplace' && 'Carbon Credits Marketplace'}
            {activeTab === 'blockchain' && 'Blockchain Transactions'}
            {activeTab === 'projects' && 'All Projects'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setSettingsOpen(false);
              }}
              className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
            >
              🔔
              {notificationsData.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationsData.filter(n => !n.read).length}
                </span>
              )}
            </button>
            {notificationsOpen && <NotificationsPanel />}
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setNotificationsOpen(false);
              }}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
            >
              ⚙️
            </button>
            {settingsOpen && <SettingsPanel />}
          </div>

          <div className="hidden sm:flex flex-col items-end mr-3">
            <span className="text-white text-sm font-semibold truncate max-w-[160px]">{profile?.name || 'Admin'}</span>
            <span className="text-blue-300 text-xs uppercase">{(profile?.role || 'admin')}</span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800/60 border border-blue-800/30 text-blue-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800/80 transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Projects Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-sm">
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Location</th>
                    <th className="text-left py-3">Progress</th>
                    <th className="text-left py-3">Credits</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map(p => (
                    <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 text-white">{p.name}</td>
                      <td className="py-3 text-slate-400">{p.location}</td>
                      <td className="py-3 text-slate-300">{p.progress}%</td>
                      <td className="py-3 text-green-400">{p.credits}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <SystemReports />;
      case 'marketplace':
        return <MarketSpace />;
      case 'blockchain':
        return <BlockchainTransactions />;
      case 'overview':
      default:
        return (
          <>
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
                  <h2 className="text-2xl font-bold text-white">All Projects Worldwide</h2>
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
          </>
        );
    }
  };

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
                  Welcome back, Admin
                </h1>
                <p className="text-blue-300 text-lg">
                  Manage global carbon credit projects and transactions.
                </p>
              </div>

              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 