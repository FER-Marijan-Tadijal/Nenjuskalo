import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const searchTerm = new URL(request.url).searchParams.get('q');

    if (!searchTerm) {
        return NextResponse.json({ message: 'Please provide a search term', status: 400 });
    }

    const items = await prisma.item.findMany({
        where: {
            OR: [
                { title: { contains: searchTerm } },
                { description: { contains: searchTerm } },
                // TODO: dodati jos atributa kada se odlucimo sto zelimo
            ],
        },
    });

    return NextResponse.json(items);
}