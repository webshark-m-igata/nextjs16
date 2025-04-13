'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/app/components/admin/Sidebar';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading' || status === 'unauthenticated' || session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
