'use client';
import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { Button, Text } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import { SearchInput } from './SearchInput';

const Header: React.FC = () => {
  const router = useRouter();
  // const isActive: (pathname: string) => boolean = (pathname) =>
  //   router.pathname === pathname;

  const { data: session, status } = useSession();
  console.log('session', session);

  let left = (
    <div>
      <Text fw={700} mr={'sm'}>
        CookMate
      </Text>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div>
        <Text fw={700} mr={'sm'}>
          CookMate
        </Text>
      </div>
    );
    right = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div>
        <Link href='/api/auth/signin'>Log in</Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className='flex align-middle'>
        <Text className='self-center' fw={700} mr={'sm'}>
          CookMate
        </Text>
        <Link className='self-center' href='/'>
          Recipes
        </Link>
        <SearchInput defaultValue='' />
      </div>
    );
    right = (
      <div className='flex align-middle'>
        <div className='self-center mr-2'>
          {session?.user?.name} ({session?.user?.email})
        </div>
        <Button
          className='self-center'
          onClick={() => {
            router.push('/create');
          }}
          mr={'sm'}
        >
          New Recipe
        </Button>
        <Button className='self-center' onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    );
  }

  return (
    <nav className='flex justify-between py-3 px-4 bg-slate-100 mb-4'>
      {left}
      {right}
    </nav>
  );
};

export default Header;