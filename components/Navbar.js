import React from "react";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import { Button } from "@chakra-ui/button";

const Navbar = () => {
  const [session] = useSession();

  return (
    <nav className='flex justify-between items-center px-10 py-4'>
      <div className=''>
        <Link href='/'>
          <a className='text-5xl font-bold'>Propi</a>
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-end'>
        <Link href='/profile' className='font-bold mr-10 text-2xl'>
          Profile
        </Link>
        <div className='flex px-2'>
          {!session && (
            <Link href='/signin' className=' text-2xl mr-10 font-bold'>
              Sign In
            </Link>
          )}
          {session && (
            <Button
              size='lg'
              onClick={() => signOut()}
              textColor='#FFF'
              colorScheme='blackAlpha'>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
