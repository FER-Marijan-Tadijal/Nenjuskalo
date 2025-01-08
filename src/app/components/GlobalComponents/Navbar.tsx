"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    InputBase,
    Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { styled } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

// Styled Components
const SearchBox = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: "20px",
    backgroundColor: "#A2CFFF",
    "&:hover": {
        backgroundColor: "#8AB3E9",
    },
    width: "100%",
    maxWidth: "300px",
    marginLeft: theme.spacing(2),
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    color: "#003049",
    padding: theme.spacing(1, 1, 1, 3),
    paddingRight: `calc(1em + ${theme.spacing(5)})`,
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1rem",
    width: "100%",
    "&::placeholder": {
        color: "#003049",
        opacity: 0.6,
    },
}));

const NavbarLink = styled(Button)(({ theme }) => ({
    color: "#F1E9DA",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.05em",
    fontSize: "1rem",
    textTransform: "uppercase",
    "&:hover": {
        color: "#FFC300",
    },
}));

interface NavbarProps {
    session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!query.trim() || query.trim().length < 3) {
            alert("Pojam za pretragu mora sadržavati barem tri znaka!");
            return;
        }
        router.push(`/explore?search=${encodeURIComponent(query)}`);
    };

    return (
        <AppBar
            position="fixed"
            sx={{ bgcolor: "#003049", width: "100%", boxShadow: "none" }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
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
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: "50%" }}
                                />
                            </Box>
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
                    <Link href="/" passHref>
                        <NavbarLink>Početna</NavbarLink>
                    </Link>
                    <Link href="/categories" passHref>
                        <NavbarLink>Kategorije</NavbarLink>
                    </Link>
                    <Link href="/explore" passHref>
                        <NavbarLink>Istraži</NavbarLink>
                    </Link>
                    {session && (
                        <Link href="/message" passHref>
                            <NavbarLink>Poruke</NavbarLink>
                        </Link>
                    )}
                    {session && (
                        <Link href="/profile" passHref>
                            <NavbarLink>Profil</NavbarLink>
                        </Link>
                    )}
                </Box>

                {/* Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexGrow: 4.5,
                    }}
                >
                    <SearchBox
                        onSubmit={handleSearch}
                        sx={{
                            maxWidth: "500px",
                            width: "100%",
                        }}
                    >
                        <StyledInput
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
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

                {/* Login/Logout Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    {!session ? (
                        <>
                            {/* Google Login Button */}
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
                                    px: 2,
                                }}
                                onClick={() => signIn("google")}
                            >
                                Prijava
                            </Button>

                            {/* GitHub Login Button */}
                            <Button
                                variant="contained"
                                startIcon={<GitHubIcon />}
                                sx={{
                                    bgcolor: "#FFC300",
                                    color: "#003049",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        bgcolor: "#E5A800",
                                    },
                                    textTransform: "none",
                                    px: 2,
                                }}
                                onClick={() => signIn("github")}
                            >
                                Prijava
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#FFC300",
                                color: "#003049",
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: "bold",
                                "&:hover": {
                                    bgcolor: "#E5A800",
                                },
                                textTransform: "none",
                                px: 2,
                            }}
                            onClick={() => signOut()}
                        >
                            Odjava
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
