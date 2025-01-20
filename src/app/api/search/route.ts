import {NextResponse} from 'next/server';
import {orderByEnum} from '@/app/enums/orderByEnum';
import {prisma} from "@/prisma";
import {stateEnum} from "@/app/enums/stateEnum";
import {Prisma} from "@prisma/client";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q') || undefined;
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || '2147483646');
    const orderBy = (url.searchParams.get('orderBy') || orderByEnum.newest) as orderByEnum;
    const categoryId = parseInt(url.searchParams.get('categoryId') || '-1');
    const conditionId = parseInt(url.searchParams.get('conditionId') || '-1');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const whereClause: Prisma.itemWhereInput = {
        AND: [
            ...(searchTerm
                ? [{
                    OR: [
                        {title: {contains: searchTerm, mode: 'insensitive'}},
                        {description: {contains: searchTerm, mode: 'insensitive'}},
                        {siteuser_item_selleridTositeuser: {country: {contains: searchTerm, mode: 'insensitive'}}},
                        {siteuser_item_selleridTositeuser: {city: {contains: searchTerm, mode: 'insensitive'}}},
                        {siteuser_item_selleridTositeuser: {street: {contains: searchTerm, mode: 'insensitive'}}},
                        {siteuser_item_selleridTositeuser: {houseno: {contains: searchTerm, mode: 'insensitive'}}},
                    ]
                }]
                : []),
            {itemchangestate: {some: {stateid: stateEnum.active}}}, // check if item is active
            {askingprice: {gte: minPrice, lte: maxPrice}},
            ...(conditionId !== -1 ? [{conditionid: conditionId}] : []),
            ...(categoryId !== -1 ? [{belongsto: {some: {categoryid: categoryId}}}] : [])
        ]
    };

    const orderByClause =
        orderBy === orderByEnum.newest
            ? {id: 'desc'}
            : orderBy === orderByEnum.oldest
                ? {id: 'asc'}
                : orderBy === orderByEnum.highestPrice
                    ? {askingprice: 'desc'}
                    : {askingprice: 'asc'};

    // try {
    const query: Prisma.itemFindManyArgs = {
        include: {
            belongsto: {
                select: {
                    categoryid: true,
                },
            },
            itemchangestate: {
                orderBy: {
                    changetime: 'desc',
                },
                select: {
                    stateid: true,
                    changetime: true,
                },
                take: 1
            } || []
        },
        where: whereClause,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
    };

    const [items, count] = await prisma.$transaction([
        prisma.item.findMany(query),
        prisma.item.count({where: query.where})
    ]);

    if (items.length === 0) {
        return NextResponse.json({message: 'No items found', status: 404});
    } else {
        const filteredItems = items.filter(item => item.itemchangestate[0]?.stateid === stateEnum.active);
        return NextResponse.json({data: filteredItems, totalCount: count});
    }
    // } catch (err: unknown) {
    //     return NextResponse.json({
    //         error: err,
    //         searchTerm,
    //         minPrice,
    //         maxPrice,
    //         orderBy,
    //         categoryId,
    //         conditionId,
    //         page,
    //         pageSize,
    //         whereClause,
    //         orderByClause,
    //         status: 500
    //     });
    // }
}