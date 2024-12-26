"use client";
import ExplorePage from "@/app/pages/ExplorePage";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const searchTerm = typeof search === "string" ? search : "";
    return <ExplorePage searchTerm={searchTerm} />;
}
