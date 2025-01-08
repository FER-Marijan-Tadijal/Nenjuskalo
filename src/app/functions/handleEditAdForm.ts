"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleEditAdForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        let id = parseInt(formData.get("id") as string)
        let item = await prisma.item.findFirst({
            where: {
                id: id,
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

        let state = 0;
        let stateAsStr = formData.get("state") as string;
        if (stateAsStr == "publish") state = 1;

        await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                askingprice: parseFloat(formData.get("askingprice") as string),
                sellerid: session.user?.id != undefined ? session.user?.id : "greska",
                conditionid: parseInt(formData.get("condition") as string)
            }
        })
        await prisma.belongsto.deleteMany({
            where: {
                itemid: id
            }
        })
        await prisma.belongsto.create({
            data: {
                categoryid: parseInt(formData.get("category") as string),
                itemid: id
            }
        })
        await prisma.itemchangestate.create({
            data: {
                itemid: id,
                stateid: state,
                changetime: new Date(),
            }
        })
        if (data != null) {
            await prisma.picture.upsert({
                where: {
                    itemid_index: {
                        itemid: id, 
                        index: 0,
                    },
                },
                update: {
                    picdata: data,
                },
                create: {
                    itemid: id,
                    index: 0,
                    picdata: data,
                },
            })
        }
        
    }
}