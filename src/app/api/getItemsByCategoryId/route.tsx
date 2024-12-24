import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { orderByEnum } from "@/app/enums/orderByEnum";
import { stateEnum } from "@/app/enums/stateEnum";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const idAsString = (url.searchParams.get('id')) ?? "0";
    const orderBy = (url.searchParams.get('orderBy') || orderByEnum.newest) as orderByEnum;
    const pageNum = parseInt((url.searchParams.get('pageNum') || '0'));
    const nPerPage = parseInt((url.searchParams.get('nPerPage') || '1'));


    if (!idAsString) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }

    const category_id = parseInt(idAsString);

    const Items = await prisma.belongsto.findMany({
        select: {
            item: {
                include: {
                    itemchangestate: true
                }
            }
        },
        where: {
            categoryid: category_id,
        }
    })


    //include only active items

    for (var i = 0; i < Items.length; i++) {
        Items[i].item.itemchangestate.sort((a, b) => new Date(b.changetime) - new Date(a.changetime));
        if (Items[i].item.itemchangestate[0].stateid != stateEnum.active) {
            Items.splice(i, 1);
        }
    }

    //order by

    var sortvalid = true;

    const orderedItems =
        orderBy == orderByEnum.newest
            ? Items.sort((a, b) => b.item.itemchangestate[0].changetime - a.item.itemchangestate[0].changetime)
            : orderBy == orderByEnum.oldest
                ? Items.sort((a, b) => a.item.itemchangestate[0].changetime - b.item.itemchangestate[0].changetime)
                : orderBy == orderByEnum.lowestPrice
                    ? Items.sort((a, b) => a.item.askingprice - b.item.askingprice)
                    : orderBy == orderByEnum.highestPrice
                        ? Items.sort((a, b) => b.item.askingprice - a.item.askingprice)
                        : sortvalid = false;

    if (!sortvalid)
        return NextResponse.json({ message: "invalid sort", status: 404 }); //console.log("invalid sort");

    //pagination

    const pagedItems = orderedItems.slice(pageNum * nPerPage, (pageNum + 1) * nPerPage);




    if (Items.length == 0) {
        return NextResponse.json({ message: "no items found", status: 404 });
    }

    //include seller details
    var finalItems = [];
    var seller;

    for(var i = 0; i < pagedItems.length; i++){
        seller = await prisma.user.findFirst({
            where: {
                id: pagedItems[i].item.sellerId
            }
        })
        finalItems.push({item: pagedItems[i], sellerinfo: seller});
    }




    return Response.json(finalItems);

}