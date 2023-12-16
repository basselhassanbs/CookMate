'use client';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import RecipeCard, { RecipeCardProps } from './RecipeCard';
import prisma from '@/lib/prisma';

const RecipesGrid: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('/api/recipes', {
      cache: 'no-cache',
      next: {
        revalidate: 60,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);
  return (
    <Grid>
      {recipes.length ? (
        recipes.map((recipe) => (
          <Grid.Col span={2} className='post'>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))
      ) : (
        <div className='text-2xl font-bold'>No data to show!</div>
      )}
    </Grid>
  );
};

export default RecipesGrid;
