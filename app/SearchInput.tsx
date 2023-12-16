'use client';
import { TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';

interface iDefault {
  defaultValue: string | null;
}

export const SearchInput = ({ defaultValue }: iDefault) => {
  const router = useRouter();

  const [inputValue, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  const handleSearch = () => {
    if (inputValue) return router.push(`/search/?q=${inputValue}`);

    if (!inputValue) return router.push('/');
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === 'Enter') {
      return handleSearch();
    }
  };

  return (
    <TextInput
      type='text'
      id='inputId'
      placeholder='Search...'
      value={inputValue ?? ''}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      className='pl-3'
    />
  );
};
