import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

// POST /api/recipe
// Required fields in body: name
// Optional fields in body: description
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, imageURL } = req.body;

  const session = await getServerSession(req, res, options);

  const result = await prisma.recipe.create({
    data: {
      name: name,
      description: description,
      imageURL: imageURL,
      user: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
}
