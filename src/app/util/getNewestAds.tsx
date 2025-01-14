import { prisma } from "@/prisma";

export default async function getNewestAds(num: number) { 
    const items = await prisma.$queryRaw`WITH ics AS (
            SELECT 
                itemid, 
                stateid,
                ROW_NUMBER() OVER (PARTITION BY itemid ORDER BY changetime DESC) AS row_num
            FROM itemchangestate
        )
        SELECT item.*
        FROM item
        JOIN ics ON item.id = ics.itemid
        WHERE ics.row_num = 1
        AND ics.stateid = 1
        ORDER BY itemid desc
        LIMIT ${num};`;

    return items
}