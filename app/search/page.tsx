'use client';
import { useSearchParams } from 'next/navigation';
import RecipesGrid from '../RecipesGrid';
import { Grid } from '@mantine/core';
import RecipeCard, { RecipeCardProps } from '../RecipeCard';

async function searchRecipes(searchQuery: string | null) {
  const res = await fetch(`/api/search?q=${searchQuery}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const SearchPage = async () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;

  const data: RecipeCardProps[] = await searchRecipes(searchQuery);

  return data.length ? (
    <>
      <div className='text-xl mb-4'>
        Showing results for:{' '}
        <span className='font-semibold'>{searchQuery}</span>
      </div>
      <Grid>
        {data.length ? (
          data.map((recipe) => (
            <Grid.Col span={2} className='post'>
              <RecipeCard recipe={recipe} />
            </Grid.Col>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </>
  ) : (
    <div className='text-2xl font-bold'>No data found!</div>
  );
};

export default SearchPage;
