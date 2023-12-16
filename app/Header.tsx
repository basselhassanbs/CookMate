'use client';
import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { Button, Text } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SearchInput } from './SearchInput';

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

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
      // <div>
      //   <Link href='/api/auth/signin'>Log in</Link>
      // </div>
      <Button
        variant='filled'
        color='indigo'
        className='self-center bg-current'
        onClick={() => signIn()}
      >
        Log in
      </Button>
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
          className='self-center bg-current'
          variant='filled'
          color='blue'
          onClick={() => {
            router.push('/create');
          }}
          mr={'sm'}
        >
          New Recipe
        </Button>
        <Button
          variant='filled'
          color='blue'
          className='self-center bg-current'
          onClick={() => signOut()}
        >
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
