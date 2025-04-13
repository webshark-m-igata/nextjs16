import Image from "next/image";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Auth App</h1>

          {user ? (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Hello, {user.name || user.email}!</h2>
              <p className="text-gray-600 mb-4">
                You are logged in as a <span className="font-medium">{user.role}</span> user.
              </p>
              {user.role === 'admin' && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                  <p className="text-indigo-700">
                    As an admin, you have access to the admin dashboard.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <p className="text-gray-600 mb-4">
                Please sign in to access your account or register if you don&apos;t have one.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/login"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/regist"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Register
                </a>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-2">User Authentication</h3>
                <p className="text-gray-600">Secure login and registration system with password hashing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-2">Role-Based Access</h3>
                <p className="text-gray-600">Different access levels based on user roles (admin, user).</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-2">Responsive Design</h3>
                <p className="text-gray-600">Works seamlessly on desktop and mobile devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
