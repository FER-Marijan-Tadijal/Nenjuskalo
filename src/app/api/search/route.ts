import {NextResponse} from 'next/server';
import {orderByEnum} from '@/app/enums/orderByEnum';
import {prisma} from "@/prisma";
import {stateEnum} from "@/app/enums/stateEnum";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q');
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || 'Infinity');
    const orderBy = url.searchParams.get('orderBy') as orderByEnum || orderByEnum.newest;
    const categoryId = parseInt(url.searchParams.get('categoryId') || '-1');
    const conditionId = parseInt(url.searchParams.get('conditionId') || '-1');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = 10;

    const whereClause = {
        OR: [
            {title: {contains: searchTerm}},
            {description: {contains: searchTerm}},
        ],
        AND: [
            {askingprice: {gte: minPrice, lte: maxPrice}},
            conditionId !== -1 ? {conditionid: {equals: conditionId}} : {},
            categoryId !== -1 ? {belongsto: {some: {categoryid: categoryId}}} : {},
        ],

    };

    const items = await prisma.item.findMany({
        include: {
            belongsto: {
                select: {
                    categoryid: true,
                },
            },
            itemchangestate: { // Ovo se crveni iz nekog razloga dok je itemchangestate ovdje, ali radi
                orderBy: {
                    changetime: 'desc',
                },
                select: {
                    stateid: true,
                    changetime: true,
                },
                take: 1,
            }
        },
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    if (items.length === 0) {
        return NextResponse.json({message: 'No items found', status: 404});
    } else {
        const filteredItems = items.filter(item => item.itemchangestate[0].stateid === stateEnum.active);

        const sortedItems = orderBy === orderByEnum.newest
            ? filteredItems.sort((a, b) => b.itemchangestate[0].changetime - a.itemchangestate[0].changetime)
            : orderBy === orderByEnum.oldest
                ? filteredItems.sort((a, b) => a.itemchangestate[0].changetime - b.itemchangestate[0].changetime)
                : orderBy === orderByEnum.highestPrice
                    ? filteredItems.sort((a, b) => b.askingprice - a.askingprice)
                    : filteredItems.sort((a, b) => a.askingprice - b.askingprice);

        return NextResponse.json(sortedItems);
    }
}