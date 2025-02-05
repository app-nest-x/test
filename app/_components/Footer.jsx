'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; 2025 Nimesh Nilashan. All rights reserved.</p>
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <Link 
            href="https://nimesh-nilashan.netlify.app/" 
            className="hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}


