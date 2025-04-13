'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Next.js Auth App',
    siteDescription: 'Application with authentication and role-based access control',
    allowRegistration: true,
    defaultUserRole: 'user',
  });
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: '',
  });
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 6,
    requireSpecialChars: false,
    requireNumbers: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', {
        general: generalSettings,
        email: emailSettings,
        security: securitySettings
      });
      setSuccessMessage('Settings saved successfully!');
      setIsLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-gray-500 mt-1">Configure your application settings</p>
      </div>
      
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => handleTabChange('general')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => handleTabChange('email')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => handleTabChange('security')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                
                <div className="mb-4">
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    id="siteName"
                    name="siteName"
                    type="text"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    rows="3"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      id="allowRegistration"
                      name="allowRegistration"
                      type="checkbox"
                      checked={generalSettings.allowRegistration}
                      onChange={handleGeneralChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-900">
                      Allow Public Registration
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    If disabled, only administrators can create new user accounts.
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700 mb-1">
                    Default User Role
                  </label>
                  <select
                    id="defaultUserRole"
                    name="defaultUserRole"
                    value={generalSettings.defaultUserRole}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    The default role assigned to newly registered users.
                  </p>
                </div>
              </div>
            )}
            
            {/* Email Settings */}
            {activeTab === 'email' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Email Settings</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Configure email settings for notifications and password resets.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="smtpServer" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Server
                    </label>
                    <input
                      id="smtpServer"
                      name="smtpServer"
                      type="text"
                      placeholder="e.g., smtp.gmail.com"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Port
                    </label>
                    <input
                      id="smtpPort"
                      name="smtpPort"
                      type="text"
                      placeholder="e.g., 587"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Username
                    </label>
                    <input
                      id="smtpUser"
                      name="smtpUser"
                      type="text"
                      placeholder="Your SMTP username"
                      value={emailSettings.smtpUser}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Password
                    </label>
                    <input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      placeholder="Your SMTP password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Email
                    </label>
                    <input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      placeholder="noreply@example.com"
                      value={emailSettings.senderEmail}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Name
                    </label>
                    <input
                      id="senderName"
                      name="senderName"
                      type="text"
                      placeholder="Your App Name"
                      value={emailSettings.senderName}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-700">
                    Note: This is a demo app. Email functionality is not implemented.
                  </p>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                
                <div className="mb-4">
                  <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    id="passwordMinLength"
                    name="passwordMinLength"
                    type="number"
                    min="4"
                    max="32"
                    value={securitySettings.passwordMinLength}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      id="requireSpecialChars"
                      name="requireSpecialChars"
                      type="checkbox"
                      checked={securitySettings.requireSpecialChars}
                      onChange={handleSecurityChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-900">
                      Require Special Characters in Password
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      id="requireNumbers"
                      name="requireNumbers"
                      type="checkbox"
                      checked={securitySettings.requireNumbers}
                      onChange={handleSecurityChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-900">
                      Require Numbers in Password
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Login Attempts
                  </label>
                  <input
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Number of failed login attempts before account is temporarily locked.
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-700">
                    Note: This is a demo app. Security settings are not fully implemented.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
