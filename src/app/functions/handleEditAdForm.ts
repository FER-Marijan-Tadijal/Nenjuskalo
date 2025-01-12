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

        let state = 0;
        let stateAsStr = formData.get("state") as string;
        if (stateAsStr == "active") state = 1;

        let title = formData.get("title") as string;
        let description = formData.get("description") as string;
        let askingPrice = parseFloat(formData.get("askingprice") as string);
        if (Number.isNaN(askingPrice)) askingPrice = 0;
        let sellerId = session.user?.id != undefined ? session.user?.id : "greska";
        let conditionId = parseInt(formData.get("condition") as string);

        let categories = JSON.parse(formData.get("category") as string);
        console.log("categories: ", categories)
        let categoryIds = []
        for (let category of categories) {
            if (!(category.id in categoryIds))
            categoryIds.push(category.id)
        }

        await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                askingprice: askingPrice,
                sellerid: sellerId,
                conditionid: conditionId,
            }
        })
        await prisma.belongsto.deleteMany({
            where: {
                itemid: id
            }
        })

        for (let categoryId of categoryIds) {
            await prisma.belongsto.create({
                data: {
                    categoryid: categoryId,
                    itemid: id
                }
            })
        }
        await prisma.itemchangestate.create({
            data: {
                itemid: id,
                stateid: state,
                changetime: new Date(),
            }
        })
    }
}