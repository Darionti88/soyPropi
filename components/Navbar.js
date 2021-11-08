import React from "react";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const Navbar = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <nav className='flex justify-between items-center px-10 py-3 sticky z-50 top-0 bg-white shadow-md rounded-br-lg rounded-bl-lg'>
      <div className=''>
        <Link href='/'>
          <a className='text-6xl font-bold font-metro propi'>Propi</a>
        </Link>
      </div>
      <ul className='flex flex-1 items-center space-x-20 justify-end text-3xl pr-10'>
        {session && (
          <li>
            <Link href='/edit_account' className='font-bold  '>
              Profile
            </Link>
          </li>
        )}
        {router.route === "/" && (
          <>
            <li>
              <Link href='/profile' className='font-bold '>
                About
              </Link>
            </li>
            <li>
              <Link href='/profile' className='font-bold '>
                Contact
              </Link>
            </li>
          </>
        )}

        {!session && (
          <li>
            <Link href='/signin' className='font-bold'>
              Sign In
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Button
              size='lg'
              onClick={() => signOut()}
              textColor='#FFF'
              colorScheme='purple'>
              Sign Out
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
