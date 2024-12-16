import { prisma } from "@/prisma";

export default async function getRandomItems(num: number) {
    const items = await prisma.$queryRaw`SELECT * FROM Item ORDER BY random() LIMIT ${num}`;

    return items
}