"use client";
import { Container, Typography, Box, ThemeProvider } from "@mui/material";
import ItemView from "./pages/ItemViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExplorePage from "./pages/ExplorePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./styles/theme";
import ProfilePage from "./pages/ProfilePage";

export default function Home() {
    return <ItemView />;
}
