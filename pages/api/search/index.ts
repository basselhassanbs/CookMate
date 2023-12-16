import { Recipe, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { q: query } = req.query;

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

      res.status(200).json(recipes);
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}
