"use client";
import React from "react";
import ItemView from "@/app/pages/ItemViewPage";
import { useSearchParams } from "next/navigation";

const page = (itemId: string) => {
    const searchParams = useSearchParams();
    const itemid = searchParams.get("id"); // Get "id" from the query string    const id = typeof itemid === "string" ? itemid : "";
    const id = typeof itemid === "string" ? itemid : "";
    return <ItemView itemId={id} />;
};

export default page;
