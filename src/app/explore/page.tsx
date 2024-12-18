"use client";
import ExplorePage from "@/app/pages/ExplorePage";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search"); // Get "id" from the query string    const id = typeof itemid === "string" ? itemid : "";
    const searchTerm = typeof search === "string" ? search : "";
    return <ExplorePage searchTerm={searchTerm} />;
}
