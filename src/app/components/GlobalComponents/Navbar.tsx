"use client";

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    InputBase,
    Button,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";

const SearchBox = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "20px", // Rounded corners
    backgroundColor: "#A2CFFF",
    "&:hover": {
        backgroundColor: "#8AB3E9", // Slightly darker blue on hover
    },
    width: "100%",
    maxWidth: "300px",
    marginLeft: theme.spacing(2),
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    color: "#003049",
    padding: theme.spacing(1, 1, 1, 3),
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1rem",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
        color: "#003049", // Placeholder text
        opacity: 0.6, // Make placeholder lighter
    },
}));

// Custom styling for Navbar Links
const NavbarLink = styled(Button)(({ theme }) => ({
    color: "#F1E9DA",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.05em",
    fontSize: "1rem",
    textTransform: "uppercase",
    "&:hover": {
        color: "#FFC300", // Yellow on hover
    },
}));

export default function Navbar() {
    return (
        <AppBar
            position="fixed"
            sx={{ bgcolor: "#003049", width: "100%", boxShadow: "none" }}
        >
            {" "}
            {/* Dark Blue */}
            <Toolbar sx={{ justifyContent: "center" }}>
                {/* Logo and Home Link */}
                <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                    <Link
                        href="/"
                        passHref
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* Rounded Logo Container */}
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="Šnjofalica Logo"
                                    width={40}
                                    height={40}
                                    priority
                                />
                            </Box>

                            {/* Title */}
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#FFC300",
                                    fontFamily: "'Poppins', sans-serif",
                                    ml: 1,
                                    fontWeight: "bold",
                                }}
                            >
                                Šnjofalica
                            </Typography>
                        </Box>
                    </Link>
                </Box>

                {/* Navigation Links */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        gap: 2,
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                >
                    {["Početna", "Artikli", "Košarica"].map((label) => (
                        <Link
                            href={`/${label.toLowerCase()}`}
                            key={label}
                            passHref
                        >
                            <NavbarLink>{label}</NavbarLink>
                        </Link>
                    ))}
                </Box>

                {/* Centered Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexGrow: 2,
                    }}
                >
                    <SearchBox>
                        <StyledInput
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                        <IconButton
                            type="submit"
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 4,
                                color: "#003049",
                            }}
                        >
                            <Search />
                        </IconButton>
                    </SearchBox>
                </Box>

                {/* Login with Google Button and Cart Icon */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{
                            bgcolor: "#FFC300",
                            color: "#003049",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                            "&:hover": {
                                bgcolor: "#E5A800",
                            },
                            textTransform: "none",
                            mr: 2,
                            px: 2,
                        }}
                        onClick={() =>
                            console.log("Log in with Google clicked")
                        }
                    >
                        Logirajte se uz Google
                    </Button>

                    {/* Cart Icon */}
                    <IconButton
                        component={Link}
                        href="/cart"
                        size="large"
                        sx={{ color: "#F1E9DA" }}
                    >
                        {" "}
                        {/* Off-White */}
                        <ShoppingCart />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
