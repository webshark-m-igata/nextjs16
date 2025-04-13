'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleGuard({ 
  children, 
  allowedRoles = [], 
  fallback = null 
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // If the user is authenticated but doesn't have the required role
    if (status === 'authenticated' && 
        allowedRoles.length > 0 && 
        !allowedRoles.includes(session?.user?.role)) {
      router.push('/unauthorized');
    }
  }, [status, session, router, allowedRoles]);
  
  // Show loading state
  if (status === 'loading') {
    return <div className="flex justify-center p-8">Loading...</div>;
  }
  
  // If user is not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }
  
  // If user is authenticated but doesn't have the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(session?.user?.role)) {
    return fallback;
  }
  
  // User is authenticated and has the required role
  return children;
}
