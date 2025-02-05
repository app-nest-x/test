import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; 2025 Nimesh Nilashan. All rights reserved.</p>
        <nav className="flex space-x-4 mt-4 md:mt-0">
         
          <a href="https://nimesh-nilashan.netlify.app/" className="hover:text-gray-400">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


