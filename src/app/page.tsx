"use client";

//import { Container, Typography, Box, ThemeProvider } from "@mui/material";
//import ItemView from "./pages/ItemViewPage";
//import NotFoundPage from "./pages/NotFoundPage";
import ExplorePage from "./pages/ExplorePage";
//import theme from "./styles/theme";
//import ProfilePage from "./pages/ProfilePage";
import Component from "@/app/Component";

//import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return <ExplorePage />;
}
