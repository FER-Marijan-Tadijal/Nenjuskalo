"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Badge, Button } from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/system";
import Link from "next/link";
import GoogleIcon from '@mui/icons-material/Google'; // Using Material UI Google Icon for the button

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(2)})`,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "darkslategray", width: "100%" }}>
      <Toolbar>
        {/* Logo and Home Link */}
        <Typography variant="h6" component={Link} href="/" sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}>
          Šnjofalica
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          <Button component={Link} href="/" sx={{ color: "white" }}>
            Home
          </Button>
          <Button component={Link} href="/products" sx={{ color: "white" }}>
            Products
          </Button>
          <Button component={Link} href="/cart" sx={{ color: "white" }}>
            Cart
          </Button>
        </Box>

        {/* Search Bar */}
        <SearchBox sx={{ display: { xs: "none", sm: "flex" } }}>
          <StyledInput placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          <IconButton type="submit" sx={{ position: "absolute", right: 0, color: "white" }}>
            <Search />
          </IconButton>
        </SearchBox>

        {/* Login with Google Button */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{
              bgcolor: "#4285F4",
              color: "white",
              "&:hover": {
                bgcolor: "#357ae8",
              },
              textTransform: "none", // Keeps "Log in with Google" text normal
              mr: 2,
            }}
            onClick={() => console.log("Log in with Google clicked")}
          >
            Log in with Google
          </Button>

          {/* Cart Icon with Badge */}
          <IconButton component={Link} href="/cart" size="large" color="inherit">
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
