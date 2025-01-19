"use server";

import {prisma} from "@/prisma";

type HandleAddBuyerIdToItemProps = {
    itemId: string;
    buyerId: string;
};

export async function HandleAddBuyerIdToItem({itemId, buyerId}: HandleAddBuyerIdToItemProps) {
    await prisma.item.update({
        where: {id: parseInt(itemId)},
        data: {
            buyerid: buyerId,
        },
    });
}