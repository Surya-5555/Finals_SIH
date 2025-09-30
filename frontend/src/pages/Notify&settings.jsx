import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNotificationsSettings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const navigate = useNavigate();

  // Mock data
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

  const unreadCount = notificationsData.filter(n => !n.read).length;

  const NotificationItem = ({ notification }) => (
    <div className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200 ${
      !notification.read ? 'bg-blue-500/10' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="text-white font-medium text-sm">{notification.title}</h4>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
            )}
          </div>
          <p className="text-slate-400 text-xs mt-1">{notification.message}</p>
          <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
        </div>
      </div>
    </div>
  );

  const SettingToggle = ({ label, checked, onChange, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <span className="text-slate-300 text-sm font-medium block">{label}</span>
        {description && (
          <span className="text-slate-500 text-xs mt-1 block">{description}</span>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const SettingSelect = ({ label, value, onChange, options }) => (
    <div className="py-3">
      <label className="text-slate-300 text-sm font-medium block mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-slate-900/20 to-indigo-900/20"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-r from-indigo-600/10 to-blue-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Preferences</h1>
            <p className="text-blue-300">Manage your notifications and settings</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-slate-800/50 rounded-lg p-1 backdrop-blur-lg border border-slate-700/50">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'notifications'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-6">
                  {unreadCount}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50">
          {activeTab === 'notifications' ? (
            <div>
              {/* Notifications Header */}
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      Mark all as read
                    </button>
                    <button className="text-slate-400 hover:text-slate-300 text-sm font-medium">
                      Clear all
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notificationsData.length > 0 ? (
                  notificationsData.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-slate-400 text-lg">No notifications</div>
                    <p className="text-slate-500 text-sm mt-2">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Settings Header */}
              <div className="p-6 border-b border-slate-700/50">
                <h2 className="text-xl font-bold text-white">Account Settings</h2>
                <p className="text-slate-400 text-sm mt-1">Manage your preferences and security</p>
              </div>

              {/* Settings Content */}
              <div className="p-6">
                <div className="max-w-2xl space-y-6">
                  {/* Notification Settings */}
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h3 className="text-white font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-1">
                      <SettingToggle
                        label="Email Notifications"
                        description="Receive important updates via email"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings(prev => ({...prev, emailNotifications: e.target.checked}))}
                      />
                      <SettingToggle
                        label="Push Notifications"
                        description="Get real-time alerts in your browser"
                        checked={settings.pushNotifications}
                        onChange={(e) => setSettings(prev => ({...prev, pushNotifications: e.target.checked}))}
                      />
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h3 className="text-white font-semibold mb-4">Security</h3>
                    <SettingToggle
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings(prev => ({...prev, twoFactorAuth: e.target.checked}))}
                    />
                  </div>

                  {/* Preferences */}
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h3 className="text-white font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <SettingSelect
                        label="Language"
                        value={settings.language}
                        onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
                        options={[
                          { value: 'en', label: 'English' },
                          { value: 'es', label: 'Spanish' },
                          { value: 'fr', label: 'French' }
                        ]}
                      />
                      <SettingSelect
                        label="Timezone"
                        value={settings.timezone}
                        onChange={(e) => setSettings(prev => ({...prev, timezone: e.target.value}))}
                        options={[
                          { value: 'UTC+0', label: 'UTC+0 (London)' },
                          { value: 'UTC+1', label: 'UTC+1 (Paris)' },
                          { value: 'UTC+2', label: 'UTC+2 (Cairo)' },
                          { value: 'UTC+5:30', label: 'UTC+5:30 (India)' }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium">
                      Save Changes
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-6 py-3 rounded-lg transition-colors duration-300 font-medium">
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-white">{unreadCount}</div>
            <div className="text-slate-400 text-sm">Unread Notifications</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-white">
              {settings.emailNotifications ? 'On' : 'Off'}
            </div>
            <div className="text-slate-400 text-sm">Email Notifications</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-white">
              {settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
            </div>
            <div className="text-slate-400 text-sm">2FA Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationsSettings;