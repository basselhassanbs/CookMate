import prisma from '../../../lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (typeof query !== 'string') {
    throw new Error('Invalid request');
  }

  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return Response.json(recipes);
}
