"use client";
import CategoryViewPage from "@/app/pages/CategoryViewPage";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams<{ id: string }>();
    return <CategoryViewPage categoryId={id} />;
}
