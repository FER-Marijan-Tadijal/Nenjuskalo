import { prisma } from "@/prisma";

export async function getUser(Id: string) {
    const user = await prisma.user.findUnique({where: {id: Id}})

    // Return siteuser. Siteuser creation script must be placed into header first

    return user
}

export async function getItem(Id: number) {
    const item = await prisma.item.findUnique({where: {id: Id}})

    /*
    This could also return:
    an item's categories from belongsto,
    an item's state from itemChangeState
    an item's condition
    an item's pictures from picture
    */

    return item
}

export async function getCondition(Id: number) {
    const condition = await prisma.condition.findUnique({where: {id: Id}});

    return condition;
}

export async function getCategory(Id: number) {
    const category = await prisma.category.findUnique({where: {id: Id}});

    return category;
}

export async function getState(Id: number) {
    const state = await prisma.state.findUnique({where: {id: Id}});

    return state;
}