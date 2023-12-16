import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const recipes = await prisma.recipe.findMany({
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
