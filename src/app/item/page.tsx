import React from "react";
import ItemView from "@/app/pages/ItemViewPage";
import { useSearchParams } from "next/navigation";
import { auth } from "@/app/auth"; // Adjust the path to your `auth` helper

export default async function Page() {
    const session = await auth(); // Fetch session server-side
    const searchParams = useSearchParams();
    const itemid = searchParams.get("id"); // Get "id" from the query string
    const id = typeof itemid === "string" ? itemid : "";
    return <ItemView itemId={id} session={session} />;
}
