"use client";

import { prisma } from "@/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoriesPage from "../pages/CategoriesPage";

type category = {
    id: number;
    name: string;
};

export default function CategorySelection() {
    const [categories, setCategories] = useState<category[]>();

    const getCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/categories",
                { method: "GET" }
            );

            if (response) {
                const categories = await response.json();
                setCategories(categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return <>{categories && <CategoriesPage categories={categories} />}</>;
}
