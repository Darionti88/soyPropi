import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className='flex justify-between items-center sm:px-10 px-3 py-3 z-50 top-0 md:mb-5'>
      <div className=''>
        <Link href='/'>
          <a className=' bg-primary-green px-3 py-1 text-4xl font-bold border-2 border-text font-metro'>
            Propi
          </a>
        </Link>
      </div>
      <ul className='flex flex-1 items-center space-x-3 md:space-x-20 justify-end text-2xl md:pr-10 '>
        {session && (
          <li>
            <Link href='/edit_account' passHref>
              <strong className='hover:cursor-pointer'> Profile</strong>
            </Link>
          </li>
        )}

        {!session ? (
          <li>
            <Link href='/signin' passHref>
              <button className='button_signin'>
                <span className='button_top text-lg'> Ingresar </span>
              </button>
            </Link>
          </li>
        ) : (
          <li>
            <button
              className='rounded-md p-3 text-gray-50  bg-primary-mpago700'
              onClick={() => signOut()}>
              <span className='font-hindi font-bold text-lg'> Salir </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
