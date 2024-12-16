"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleNewAdForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        var max_id = await prisma.item.aggregate({
            _max: { id: true }
        })
        var id = max_id._max.id;
        //console.log(id);
        await prisma.item.create({
            data: {
                id: id != null ? id + 1 : -1,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                askingprice: parseInt(formData.get("askingprice") as string),
                sellerid: session.user?.id != undefined ? session.user?.id : "greska",
                conditionid: parseInt(formData.get("condition") as string)

            }
        })
        await prisma.belongsto.create({
            data: {
                categoryid: parseInt(formData.get("category") as string),
                itemid: id != null ? id + 1 : -1
            }
        })
    }
}