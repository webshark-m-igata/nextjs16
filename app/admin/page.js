'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardStats from '@/app/components/admin/DashboardStats';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    newUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);

        // Calculate stats
        const adminUsers = data.users.filter(user => user.role === 'admin').length;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newUsers = data.users.filter(user => new Date(user.createdAt) > oneWeekAgo).length;

        setStats({
          totalUsers: data.users.length,
          adminUsers,
          newUsers
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div>
          <span className="text-sm text-gray-500 mr-2">Welcome, Admin</span>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
            <Link
              href="/admin/users"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View all
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/admin/users/create"
              className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-indigo-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Create New User</h3>
                <p className="text-sm text-gray-500">Add a new user to the system</p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-indigo-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">System Settings</h3>
                <p className="text-sm text-gray-500">Configure system settings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Application Version</h3>
            <p>1.0.0</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Environment</h3>
            <p>Development</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Database</h3>
            <p>SQLite</p>
          </div>
        </div>
      </div>
    </>
  );
}
