"use client";

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import type { Session } from "next-auth";

interface ProfilePageProps {
    session: Session | null; // Accepts session as a prop
}

export default function ProfilePage({ session }: ProfilePageProps) {
    if (!session) {
        return (
            <Container
                sx={{
                    mt: 8, // Push content down to avoid Navbar overlap
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                    }}
                >
                    Pristup Odbijen!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "1rem",
                    }}
                >
                    Morate biti prijavljeni da biste pristupili ovoj stranici.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 4,
                        bgcolor: "#FFC300",
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        "&:hover": {
                            bgcolor: "#E5A800",
                        },
                    }}
                    onClick={() => signIn()}
                >
                    Prijava
                </Button>
            </Container>
        );
    }

    return (
        <Container
            sx={{
                mt: 10, // Adjust to account for the Navbar height
                maxWidth: "lg",
                textAlign: "center",
                paddingBottom: "64px",
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                    }}
                >
                    Pozdrav, {session.user?.name || "User"}!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "1.1rem",
                    }}
                >
                    Email: {session.user?.email}
                </Typography>
                <Box
                    component="img"
                    src={session.user?.image || "/images/default-profile.png"}
                    alt="Profile Picture"
                    sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        mt: 4,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 4,
                        alignItems: "center",
                    }}
                >
                  {/* New Ad Button */}
                  <Link href="/newAd" passHref>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#003049", // Dark blue for contrast
                                color: "#FFC300",
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                "&:hover": {
                                    bgcolor: "#1C4A6E",
                                },
                            }}
                        >
                            Napravi Novi Oglas
                        </Button>
                    </Link>
                    
                    {/* Sign Out Button */}
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#FFC300",
                            color: "#003049",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            "&:hover": {
                                bgcolor: "#E5A800",
                            },
                        }}
                        onClick={() => signOut()}
                    >
                        Odjava
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
