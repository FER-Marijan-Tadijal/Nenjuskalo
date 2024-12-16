import Navbar from "./components/GlobalComponents/Navbar";
import Footer from "./components/GlobalComponents/Footer";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { auth } from "./auth"; // Fetch the session on the server
import "./globals.css";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth(); // Fetch session server-side

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
