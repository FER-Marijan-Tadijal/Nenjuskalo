"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleDeleteAdForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        let id = parseInt(formData.get("id") as string);
        console.log(id);

        let item = await prisma.item.findUnique({
            where: {
                id: id,
            },
        })

        let siteuser = await prisma.siteuser.findUnique({
            where: {
                id: session.user?.id,
            },
        })

        if ((session.user?.id != item?.sellerid) && (siteuser?.roleid != 1)) return

        await prisma.itemchangestate.deleteMany({
            where: {
                itemid: id,
            },
        })
        await prisma.belongsto.deleteMany({
            where: {
                itemid: id,
            }
        })
        await prisma.picture.deleteMany({
            where: {
                itemid: id,
            }
        })
        await prisma.item.delete({
            where: {
                id: id
            }
        })
    }
}