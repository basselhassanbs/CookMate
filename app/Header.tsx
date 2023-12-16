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
      <button
        className='self-center rounded bg-blue-500 px-4 py-1 text-white font-medium'
        onClick={() => signIn()}
      >
        Log in
      </button>
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
        <button
          className='self-center mr-2 rounded bg-blue-500 px-4 py-1 text-white font-medium'
          onClick={() => {
            router.push('/create');
          }}
        >
          New Recipe
        </button>
        <button
          className='self-center rounded bg-blue-500 px-4 py-1 text-white font-medium'
          onClick={() => signOut()}
        >
          Log out
        </button>
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
