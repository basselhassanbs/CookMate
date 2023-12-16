import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return Response.json(recipes);
}
