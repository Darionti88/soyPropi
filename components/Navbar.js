import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const Navbar = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <nav className='flex justify-between items-center px-10 py-3 sticky z-50 top-0'>
      <div className=''>
        <Link href='/'>
          <a className=' bg-primary-green px-3 py-1 text-4xl font-bold border-2 border-text font-metro'>
            Propi
          </a>
        </Link>
      </div>
      <ul className='flex flex-1 items-center space-x-20 justify-end text-1xl pr-10'>
        {session && (
          <li>
            <Link href='/edit_account' className='font-bold  '>
              Profile
            </Link>
          </li>
        )}

        {!session ? (
          <li>
            <Link href='/signin' passHref>
              <button className='button_signin'>
                <span className='button_top text-lg'> Sign In</span>
              </button>
            </Link>
          </li>
        ) : (
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
