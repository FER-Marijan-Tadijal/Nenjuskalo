"use client";

import { prisma } from "@/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";

type category = {
    id: number;
    name: string;
}

export default function CategorySelection() {

    const [categories, setCategories] = useState<category[]>();

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/categories", { method: "GET" });

            if (response) {
                const categories = await response.json();
                setCategories(categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <br />
            <br />
            <h1>Category Selection</h1>
            <br />
            {categories && <ul>
                {categories.map((el) => (
                    <li key={el.id} >
                        <Link href={`/categories/${el.id}`}>{el.name}</Link></li>
                ))}
            </ul>}

            <br />
            <Link href={"/"}><strong> Go to front page </strong></Link>
        </div>
    )
}