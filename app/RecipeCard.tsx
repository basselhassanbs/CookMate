import React from 'react';
import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core';

export type RecipeCardProps = {
  user: {
    name: string | null;
  } | null;
  id: string;
  name: string;
  description: string | null;
  imageURL: string;
  userId: string | null;
};

const RecipeCard: React.FC<{ recipe: RecipeCardProps }> = ({ recipe }) => {
  const userName = recipe.user ? recipe.user.name : 'Unknown author';
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image src={recipe.imageURL} className='h-48' alt='Norway' />
      </Card.Section>

      <Group justify='space-between' mt='md' mb='xs'>
        <Text fw={500}>{recipe.name}</Text>
      </Group>

      <Text size='sm' c='dimmed'>
        By {recipe.user?.name}
      </Text>

      <Rating defaultValue={2} mt='md' />
    </Card>
  );
};

export default RecipeCard;
