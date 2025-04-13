import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// Get the session on the server
export async function getSession() {
  return await getServerSession(authOptions);
}

// Check if the user is authenticated
export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.user) {
    return null;
  }
  
  return session.user;
}

// Protect a route - redirect to login if not authenticated
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}

// Check if user has required role
export async function requireRole(requiredRole) {
  const user = await requireAuth();
  
  if (user.role !== requiredRole) {
    redirect('/unauthorized');
  }
  
  return user;
}
