import CategoryViewPage from "@/app/pages/CategoryViewPage";
import { prisma } from "@/prisma";
import Link from "next/link";
import { parse } from "path";

export default async function Category({ params }: { params: { id: string } }) {
    const { id } = await params;
    const category_id: number = parseInt(id);

    async function getSeller(sellerid: string) {
        return await prisma.siteuser.findUnique({
            where: {
                id: sellerid,
            },
        });
    }

    const category = await prisma.category.findUnique({
        where: {
            id: category_id,
        },
    });

    const items = await prisma.belongsto.findMany({
        where: {
            categoryid: category_id,
        },
        select: {
            item: true,
        },
    });
    //odkomentirati i pogledati log u browseru radi lakseg razumijevanja
    //console.log(category);
    //console.log(items);
    //console.log(await getSeller(1));
    let items_and_sellers = [];

    for (let i = 0; i < items.length; i++) {
        const sellerName = await prisma.user.findUnique({
            where: {
                id: items[i].item.sellerid,
            },
            select: {
                name: true,
            },
        });
        items_and_sellers.push({ item: items[i].item, seller: sellerName });
    }

    return (
        <>
            {category && items_and_sellers && (
                <CategoryViewPage
                    category={category}
                    items_and_sellers={items_and_sellers}
                />
            )}
        </>
    );
}
