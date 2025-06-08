// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      {/* Navigation bar */}
      <nav className="bg-white text-blue-600 px-4 py-3 shadow-md flex gap-6 items-center">
        <Link href="/" className="hover:underline font-medium">Home</Link>
        <Link href="/login" className="hover:underline font-medium">Login</Link>
        <Link href="/dashboard" className="hover:underline font-medium">Dashboard</Link>
      </nav>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
}
