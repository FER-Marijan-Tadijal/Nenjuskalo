"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleNewAdButton(formData: FormData) {
    const session = await auth();
    if (session != null) {
        var max_id = await prisma.item.aggregate({
            _max: { id: true }
        })
        var id = max_id._max.id;

        let state = 0;

        await prisma.item.create({
            data: {
                id: id != null ? id + 1 : -1,
                title: "Novi oglas",
                description: "",
                askingprice: 0,
                sellerid: session.user?.id != undefined ? session.user?.id : "greska",
                conditionid: 0,
            }
        })
        await prisma.itemchangestate.create({
            data: {
                itemid: id != null ? id + 1 : -1,
                stateid: state,
                changetime: new Date(),
            }
        })
        
        return (id != null ? id + 1 : -1)
    }
}