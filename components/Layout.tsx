// components/layout.js
import Navbar from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
