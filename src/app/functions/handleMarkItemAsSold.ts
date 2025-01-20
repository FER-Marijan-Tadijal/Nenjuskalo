"use server";

import {prisma} from "@/prisma";

export async function HandleMarkItemAsSold(itemId: string) {
    await prisma.itemchangestate.create({
        data: {
            itemid: parseInt(itemId),
            stateid: 3,
            changetime: new Date(),
        }
    })
}