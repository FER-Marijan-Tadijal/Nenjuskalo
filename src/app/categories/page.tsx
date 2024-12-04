import { prisma } from "@/prisma";
import Link from "next/link";

export default async function CategorySelection() {

    const categories = await prisma.category.findMany();

    return (
        <div>
            <h1>Category Selection</h1>
            <br />
            <ul>
                {categories.map((el) => (
                    <li key={el.id} >
                        <Link href={`/categories/${el.id}`}>{el.name}</Link></li>
                ))}
            </ul>

            <br/>
            <Link href={"/"}><strong> Go to front page </strong></Link>
        </div>
    )    
}