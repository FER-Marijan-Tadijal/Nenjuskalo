import prisma from "@/lib/db";
import Link from "next/link";

export default async function Category({ params }) {
    const { id } = await params;
    const category_id = parseInt(id);

    async function getSeller(sellerid: number) {
        return await prisma.siteuser.findUnique({
            where: {
                id: sellerid
            }
        })
    }

    const category = await prisma.category.findUnique({
        where: {
            id: category_id
        }
    })

    const items = await prisma.belongsto.findMany({
        where: {
            categoryid: category_id
        },
        select: {
            item: true
        }
    })
    //odkomentirati i pogledati log u browseru radi lakseg razumijevanja
    //console.log(category);
    //console.log(items);
    //console.log(await getSeller(1));
    let items_and_sellers = [];

    for (let i = 0; i < items.length; i++) {
        const sellerName = await prisma.siteuser.findUnique({
            where: {
                id: items[i].item.sellerid
            },
            select: {
                name: true
            }
        })
        items_and_sellers.push({ item: items[i].item, seller: sellerName });
    }
    //console.log(items_and_sellers);


    return (
        <>
            <h1>Category: {category?.name}</h1>
            <ul>
                {items_and_sellers.map((item, i) => (
                    <li key={item.item.id}>{`Item ${i + 1}: ${item.item.title}, price: ${item.item.askingprice}, seller: ${item.seller?.name}`}</li>
                ))}
            </ul>
            <Link href={"/"}><b>Go back to categories</b></Link>
        </>
    );
}
