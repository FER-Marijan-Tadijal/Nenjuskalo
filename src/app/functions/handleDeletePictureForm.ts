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

        let siteuser = await prisma.siteuser.findUnique({
            where: {
                id: session.user?.id,
            },
        })

        if ((session.user?.id != item?.sellerid) && (siteuser?.roleid != 1)) return

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