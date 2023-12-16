import React from 'react';
// import Layout from './layout';
import prisma from '../lib/prisma';
import RecipesGrid from './RecipesGrid';
import Header from './Header';
import { RecipeCardProps } from './RecipeCard';

const Home: React.FC = async (props) => {
  return <RecipesGrid />;
};

export default Home;
