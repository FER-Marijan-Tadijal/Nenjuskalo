import { prisma } from "@/prisma";
import Link from "next/link";
import { format } from "path";

export default async function makeNewAd() {

    const possible_conditions = await prisma.condition.findMany();
    const categories = await prisma.category.findMany();

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
            <form action={async (formData: FormData) => {
                "use server";
                var max_id = await prisma.item.aggregate({
                    _max: { id: true }
                })
                var id = max_id._max.id;
                //console.log(id);
                await prisma.item.create({
                    data: {
                        id: id != null ? id + 1 : -1,
                        title: formData.get("title") as string,
                        description: formData.get("description") as string,
                        askingprice: parseInt(formData.get("askingprice") as string),
                        sellerid: 1, //promijeniti sa id-ijem trenutnog korisnika
                        conditionid: parseInt(formData.get("condition") as string)
                    }
                })
                await prisma.belongsto.create({
                    data: {
                        categoryid: parseInt(formData.get("category") as string),
                        itemid: id != null ? id + 1 : -1
                    }
                })
            }}>
                <span>Naziv artikla:</span><input type="text" required name="title" /> <br />
                <span>Opis artikla:</span><input type="text" required name="description" /> <br />
                <span>Cijena artikla:</span><input type="text" required name="askingprice" /> <br />
                <span>Kategorija:</span><select required name="category">
                    {categories.map((category, i) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select> <br />
                <span>stanje artikla:</span><select required name="condition">
                    {possible_conditions.map((condition, i) => (
                        <option value={condition.id}>{condition.name}</option>
                    ))}
                </select> <br />
                <button>Submit</button>
            </form>
        </div>
    )
}