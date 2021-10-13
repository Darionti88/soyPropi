import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-5'>
      <Link href='/'>
        <a className='text-2xl font-bold'>Propi</a>
      </Link>
      <div className='flex '>
        <Link href='/signin'>
          <a className='rounded bg-green-600 hover:bg-green-800 text-white py-3 px-2'>
            Sign In
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
