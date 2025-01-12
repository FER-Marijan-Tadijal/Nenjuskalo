"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleDeletePictureForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        console.log("I'm in handledeletepictureform start!")
        let id = parseInt(formData.get("id") as string)
        let item = await prisma.item.findFirst({
            where: {
                id: id,
            },
        })
        let noofpics = await prisma.picture.count({
            where: {
                itemid: id,
            },
        })

        if (item?.sellerid != session?.user?.id) {
            console.log("Not qualified to edit")
            return
        }

        let index = parseInt(formData.get("index") as string);

        if (index >= noofpics) {
            return
        }
        

        await prisma.picture.delete({
            where: {
                itemid_index: {
                    itemid: id,
                    index: index,
                }
            },
        })

        for (let i = index+1; i < noofpics; i++) {
            await prisma.picture.update({
                where: {
                    itemid_index: {
                        itemid: id,
                        index: i,
                    },
                },
                data: {
                    index: i - 1,
                },
            })
        }
    }
}