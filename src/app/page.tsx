// src/app/page.tsx

"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        paddingTop: "64px",
        paddingBottom: "64px",
      }}
    >
      {/* Hero Section */}
      <Box sx={{ marginBottom: "40px" }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Šnjofalica!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing deals and browse our wide selection of products.
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
          Shop Now
        </Button>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Featured Products
        </Typography>
        {/* Placeholder for featured products (could be a list or a grid) */}
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Replace with actual product components */}
          <Box sx={{ width: "200px", height: "200px", bgcolor: "lightgray" }}></Box>
          <Box sx={{ width: "200px", height: "200px", bgcolor: "lightgray" }}></Box>
          <Box sx={{ width: "200px", height: "200px", bgcolor: "lightgray" }}></Box>
        </Box>
      </Box>
    </Container>
  );
}
