import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { OPTIONS } from '../auth/[...nextauth]/options';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const res = await request.json();
  const { name, description, imageURL } = res;

  const session = await getServerSession(OPTIONS);

  const result = await prisma.recipe.create({
    data: {
      name: name,
      description: description,
      imageURL: imageURL,
      user: { connect: { email: session?.user?.email! } },
    },
  });

  return Response.json(result);
}
