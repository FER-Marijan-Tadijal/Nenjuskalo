import { prisma } from "@/prisma";

export async function getUser(Id: string) {
    const user = await prisma.user.findUnique({where: {id: Id}})
    const siteuser = await prisma.siteuser.findUnique({where: {id: Id}})

    return {...user, ...siteuser}
}

export async function getItem(Id: number) {
    const item = await prisma.item.findUnique({
        where: {id: Id},
    })

    const categories = await prisma.belongsto.findMany({
        where: {
            itemid: Id,
        },
    })

    const pictures = await prisma.picture.findMany({
        where: {
            itemid: Id,
        },
    })

    const state = await prisma.itemchangestate.findMany({
        where: {
            itemid: Id,
        },
        orderBy: {changetime: "desc"},
        take: 1,
    })

    return {item: item, categories: categories, state: state, pictures: pictures,}
}

export async function getItemsFromUser(Id: string) {
    const itemList = await prisma.item.findMany({
        where: {
            sellerid: Id,
        }
    })

    return itemList;
}

export async function getCondition(Id: number) {
    const condition = await prisma.condition.findUnique({where: {id: Id}});

    return condition;
}

export async function getCategory(Id: number) {
    const category = await prisma.category.findUnique({where: {id: Id}});

    return category;
}

export async function getCategoryChildren(Id: number | null) {
    const category = await prisma.category.findMany({where: {supercategoryid: null}});

    return category;
}

export async function getState(Id: number) {
    const state = await prisma.state.findUnique({where: {id: Id}});

    return state;
}