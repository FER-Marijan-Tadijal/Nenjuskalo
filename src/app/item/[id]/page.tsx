import React from "react";
import ItemView from "@/app/pages/ItemViewPage";
import { auth } from "@/app/auth"; // Adjust the path to your `auth` helper

type PageProps = {
    params: {
        id: string; // Define the type of your route parameter
    };
};

export default async function Page({ params }: PageProps) {
    const session = await auth(); // Fetch session server-side
    const { id } = params;
    return <ItemView itemId={id} session={session} />;
}
