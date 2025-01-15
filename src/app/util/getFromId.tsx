import { prisma } from "@/prisma";
import { category } from "@prisma/client";

export async function getUser(Id: string) {
    const user = await prisma.user.findUnique({ where: { id: Id } });
    const siteuser = await prisma.siteuser.findUnique({ where: { id: Id } });

    return { ...user, ...siteuser };
}

export async function getItem(Id: number) {
    const item = await prisma.item.findUnique({
        where: { id: Id },
    });

    const categoryids = await prisma.belongsto.findMany({
        where: {
            itemid: Id,
        },
    });

    let categories: category[] = [];
    for (let categoryid of categoryids) {
        let category = await getCategory(categoryid.categoryid);
        if (category != null) categories.push(category);
    }

    const noOfPictures = await prisma.picture.count({
        where: {
            itemid: Id,
        },
    });

    const state = await prisma.itemchangestate.findMany({
        where: {
            itemid: Id,
        },
        orderBy: { changetime: "desc" },
        take: 1,
    });

    return {
        item: item,
        categories: categories,
        state: state[0],
        noOfPictures: noOfPictures,
    };
}

export async function getItemsFromUser(Id: string) {
    const itemList = await prisma.item.findMany({
        where: {
            sellerid: Id,
        },
        include: {
            itemchangestate: {
                orderBy: {
                    changetime: "desc",
                },
                select: {
                    stateid: true,
                    changetime: true,
                },
                take: 1,
            },
        },
    });

    return itemList;
}

export async function getCondition(Id: number) {
    const condition = await prisma.condition.findUnique({ where: { id: Id } });

    return condition;
}

export async function getCategory(Id: number) {
    const category = await prisma.category.findUnique({ where: { id: Id } });

    return category;
}

export async function getCategoryChildren(Id: number | null) {
    const category = await prisma.category.findMany({
        where: { supercategoryid: null },
    });

    return category;
}

export async function getState(Id: number) {
    const state = await prisma.state.findUnique({ where: { id: Id } });

    return state;
}
