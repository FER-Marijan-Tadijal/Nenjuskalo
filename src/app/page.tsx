"use client";
import { Container, Typography, Box, ThemeProvider } from "@mui/material";
import ItemView from "./components/ItemView";
import NotFoundPage from "./components/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./styles/theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ItemView />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/itemview",
        element: <ItemView />,
    },
]);

export default function Home() {
    return <RouterProvider router={router} />;
}
