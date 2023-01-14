import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <ul className="flex justify-between items-center text-sm font-medium text-gray-700 bg-gray-200 p-2">
      <li className="mr-6">
        <Link href="/" className="hover:text-indigo-500">
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link href="/about" className="hover:text-indigo-500">
          About
        </Link>
      </li>
      <li className="mr-6">
        <Link href="/faq" className="hover:text-indigo-500">
          FAQ
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
