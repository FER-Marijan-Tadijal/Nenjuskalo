// src/app/layout.tsx
import React from "react";
import Navbar from "./components/GlobalComponents/Navbar";
import {Container} from "@mui/material";
import Footer from "./components/GlobalComponents/Footer";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
//import { ThemeProvider } from "@mui/material";
import {auth} from "./auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth(); // Fetch session server-side

    return (
        <html lang="en">
            <head>
                <title>Šnjofalica - oglasnik</title>
                <meta
                    name="description"
                    content="Welcome to Šnjofalica, the best place to find everything you need."
                />
            </head>
            <body>
                <AppRouterCacheProvider>
                    <Container maxWidth={false} disableGutters>
                        {/* Navbar passes session for conditional rendering */}
                        <Navbar session={session} />
                        <main style={{ minHeight: "calc(100vh - 128px)" }}>
                            {children}
                        </main>
                        <Footer />
                    </Container>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
