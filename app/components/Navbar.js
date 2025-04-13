'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Next.js Auth App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              {session?.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {session.user.name || session.user.email}
                  {session.user.role === 'admin' && (
                    <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm text-gray-700 hover:text-indigo-600"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-indigo-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/regist"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {session?.user?.role === 'admin' && (
            <Link
              href="/admin"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {status === 'authenticated' ? (
            <div className="space-y-1">
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-700">
                  {session.user.name || session.user.email}
                </p>
                {session.user.role === 'admin' && (
                  <span className="mt-1 inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-1 px-4 py-2">
              <Link
                href="/login"
                className="block text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/regist"
                className="block text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
