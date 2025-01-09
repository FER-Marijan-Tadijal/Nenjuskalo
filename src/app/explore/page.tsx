"use client";
import { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
const ExplorePage = lazy(() => import("@/app/pages/ExplorePage"));

export default function Page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const searchTerm = typeof search === "string" ? search : "";
    return (
        <Suspense
            fallback={
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <CircularProgress />
                </Box>
            }
        >
            <ExplorePage searchTerm={searchTerm} />
        </Suspense>
    );
}
