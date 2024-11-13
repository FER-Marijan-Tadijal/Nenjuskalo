"use client";
import { Container, Typography, Box, ThemeProvider } from "@mui/material";
import ItemView from "./pages/ItemViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExplorePage from "./pages/ExplorePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./styles/theme";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ExplorePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/itemview",
        element: <ItemView />,
    },
    {
        path: "/explore",
        element: <ExplorePage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
]);

export default function Home() {
    return <RouterProvider router={router} />;
}
