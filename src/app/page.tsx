"use client";
import { Container, Typography, Box, ThemeProvider } from "@mui/material";
import ItemView from "./pages/ItemViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExplorePage from "./pages/ExplorePage";
import theme from "./styles/theme";
import ProfilePage from "./pages/ProfilePage";

export default function Home() {
    return <ItemView />;
/* For post-merge posterity
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

export default async function Home() {

import Component from "@/app/Component";


  return (
    <Container maxWidth="md" sx={{ bgcolor: "black", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Dobrodosli na nasu predivnu Nenjuskalo aplikaciju!!!
        </Typography>
        <Typography variant="body1">
          Pocetak developanja je u <code>src/app/page.tsx</code> datoteci. Sretno!
        </Typography>
        <br />
        <Link href={"/categories"}>Go to Category Selection</Link>
        <Component />
      </Box>
    </Container>
  );
*/
}
