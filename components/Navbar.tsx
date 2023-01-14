import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <ul className="bg-black">
      <li className="bg-black">
        <Link href="/" className="bg-black">
          Home
        </Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/faq">FAQ</Link>
      </li>
    </ul>
  );
};

export default Navbar;
