import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-[#191c1d] text-[#191c1d] dark:text-[#f0f1f2] font-sans selection:bg-[#beedd9] selection:text-[#002117] transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;