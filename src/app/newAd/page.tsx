import { prisma } from "@/prisma";
import Link from "next/link";
import { format } from "path";
import { auth } from "@/app/auth";
import NewAdForm from "../components/forms/NewAdForm";

export default async function makeNewAd() {
    
    const session = await auth();

    if (session == null) return (
    <div>
        <br />
        <br />
        <br />
        <h1>you must be logged in to make an ad</h1>
    </div>)

    /* console.log(await prisma.siteuser.findMany());
    console.log(await prisma.condition.findMany());
    console.log(await prisma.item.findMany());
    console.log(await prisma.belongsto.findMany());
    console.log(await prisma.category.findMany()); */

    /* await prisma.belongsto.delete({
        where: {
            categoryid_itemid: {
                categoryid: 4,
                itemid: 12,
            }
        }
    }) */

    /* await prisma.item.delete({
        where:{
            id: 12
        }
    })
 */

    return (
        <div>
            <br />
            <br />
            <h1>Create New Ad here</h1>
            <NewAdForm></NewAdForm>

        </div>
    )
}