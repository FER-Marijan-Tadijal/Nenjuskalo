"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleNewPictureForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
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

        let picture = formData.get("picture") as File;

        let data = null
        if (typeof picture === "object") { // Eh, it's probably a picture file then.
            data = await picture.bytes()
        }

        if (data != null) {
            await prisma.picture.create({
                data: {
                    itemid: id,
                    index: noofpics,
                    picdata: data,
                },
            })
        }
    }
}