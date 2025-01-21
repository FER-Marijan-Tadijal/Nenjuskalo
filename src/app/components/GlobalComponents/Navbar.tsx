"use client";

import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    InputBase,
    Button,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import { styled } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
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
    const [unreadMessages, setUnreadMessages] = useState<number>(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/explore?search=${encodeURIComponent(query)}`);
    };

    useEffect(() => {
        async function fetchUnreadMessages() {
            if (!session?.user?.id) return;

            try {
                const res = await fetch(`/api/unreadMessages?id=${session.user.id}`);
                const data = await res.json();
                setUnreadMessages(data.unreadCount || 0);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }

        fetchUnreadMessages();
        const interval = setInterval(fetchUnreadMessages, 5000);

        return () => clearInterval(interval);
    }, [session]);

    const renderLinks = () => (
        <>
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
                    <Badge
                        color="warning"
                        badgeContent={unreadMessages > 0 ? unreadMessages : null}
                        overlap="circular"
                        sx={{
                            "& .MuiBadge-badge": {
                                right: -4,
                                top: 4,
                                backgroundColor: "#FFC300",
                                color: "#003049",
                            },
                        }}
                    >
                        <NavbarLink>Poruke</NavbarLink>
                    </Badge>
                </Link>
            )}
            {session && (
                <Link href="/profile" passHref>
                    <NavbarLink>Profil</NavbarLink>
                </Link>
            )}
        </>
    );

    return (
        <AppBar position="fixed" sx={{ bgcolor: "#003049", width: "100%", boxShadow: "none" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo and Home Link */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Link href="/" passHref style={{ textDecoration: "none", color: "inherit" }}>
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
                {isSmallScreen ? (
                    <>
                        {/* Hamburger Icon */}
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    
                        {/* Drawer */}
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <Box
                                sx={{
                                    width: 250,
                                    p: 2,
                                    bgcolor: "#003049",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                }}
                            >
                                {/* Navigation Links */}
                                {renderLinks()}
                    
                                {/* Login/Logout Section */}
                                {!session ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 2,
                                            mt: "auto", // Push content to the bottom
                                        }}
                                    >
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
                                                width: "100%",
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
                                                width: "100%",
                                            }}
                                            onClick={() => signIn("github")}
                                        >
                                            Prijava
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 2,
                                            mt: "auto", // Push content to the bottom
                                            bgcolor: "#ffffff",
                                            p: 2,
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                        }}
                                    >
                                        {/* User Info */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={session.user?.image || "/images/default-profile.png"}
                                                alt="Profile Picture"
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "2px solid #FFC300",
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: "bold",
                                                    color: "#003049",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {session.user?.name || "Korisnik"}
                                            </Typography>
                                        </Box>
                    
                                        {/* Logout Button */}
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
                                                width: "100%",
                                            }}
                                            onClick={() => signOut()}
                                        >
                                            Odjava
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexGrow: 1,
                            justifyContent: "center",
                        }}
                    >
                        {renderLinks()}
                    </Box>
                )}

                {/* Search Bar */}
                {!isSmallScreen && (
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
                )}

                {/* Login/Logout Buttons */}
                {!isSmallScreen && (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        {!session ? (
                            <>
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
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        bgcolor: "#ffffff",
                                        px: 2,
                                        py: 1,
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={session.user?.image || "/images/default-profile.png"}
                                        alt="Profile Picture"
                                        sx={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "2px solid #FFC300",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: "bold",
                                            color: "#003049",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {session.user?.name || "Korisnik"}
                                    </Typography>
                                </Box>
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
                            </>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
