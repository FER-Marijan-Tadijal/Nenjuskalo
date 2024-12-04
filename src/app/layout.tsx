// src/app/layout.tsx
import React from "react";
import Navbar from "./components/GlobalComponents/Navbar"; // Reusable Navbar component
import { Container } from "@mui/material";
import Footer from "./components/GlobalComponents/Footer";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Šnjofalica - Your E-Commerce Platform</title>
                <meta
                    name="description"
                    content="Welcome to Šnjofalica, the best place to find everything you need."
                />
            </head>
            <body>
                <Container maxWidth={false} disableGutters>
                    {/* Navbar at the top */}
                    <Navbar />

                    {/* Main content area */}
                    <main style={{ minHeight: "calc(100vh - 128px)" }}>
                        {" "}
                        {/* Adjusts for Navbar and Footer height */}
                        {children} {/* Render the content of page.tsx here */}
                    </main>

                    {/* Footer at the bottom */}
                    <Footer />
                </Container>
            </body>
        </html>
    );
/* In case the merge fiddles something up
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
*/
}
