"use client";

import { orderByEnum } from "@/app/enums/orderByEnum";
import CategoryViewPage from "@/app/pages/CategoryViewPage";
import { prisma } from "@/prisma";
import Link from "next/link";
import { parse } from "path";
import { useEffect, useState } from "react";
import { use } from "react";

export default function Category({ params }: { params: { id: string } }) {
    const category_id: number = parseInt(use(params).id);
    console.log(category_id);
    var baseUrl = "http://localhost:3000";
    const [category, setCategory] = useState(null);
    const [seller, setSeller] = useState(null);
    const [items, setItems] = useState(null);

    async function getSeller(sellerid: string) { //returns 
        try {
            var res = await fetch(`${baseUrl}/api/getUser?id=${sellerid}`);

            if (res) {
                var sellerjson = await res.json();
                setSeller(sellerjson);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getCategory(id: number) {
        try {
            var res = await fetch(`${baseUrl}/api/getCategory?id=${id}`);

            if (res) {
                var categoryjson = await res.json();
                setCategory(categoryjson);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getItems(category_id: number, nPerPage: number, pageNum: number, sort_method: orderByEnum) {
        try {
            var res = await fetch(`${baseUrl}/api/getItemsByCategoryId?id=${category_id}&orderBy=${sort_method}&nPerPage=${nPerPage}&pageNum=${pageNum}`)

            if (res) {
                var itemsjson = await res.json();
                setItems(itemsjson);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        //getSeller("cm52kz7dp0000pax4vkm5wkmz");
        getCategory(category_id);
        console.log(category);
        getItems(category_id, 5, 0, orderByEnum.newest);
    }, []);

    useEffect(() => {
        console.log(category);
    }, [category]);

    useEffect(() => {
        console.log(seller);
    }, [seller]);

    useEffect(() => {
        console.log("items:");
        console.log(items);
        console.log("items and sellers: ")
        if (items)
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].item.item.title + ": " + items[i].sellerinfo.name);
            }
    }, [items]);



    return (
        <>
            {/* {category && items_and_sellers && (
                <CategoryViewPage
                    category={category}
                    items_and_sellers={items_and_sellers}
                />
            )} */}
        </>
    );
}
