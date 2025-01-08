"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Card, Grid, CardContent, CardMedia } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import type { Session } from "next-auth";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ProfileEditForm from "@/app/components/forms/ProfileEditForm";
import DeleteAdForm from "@/app/components/forms/DeleteAdForm";
import { item } from "@prisma/client";
import { stateEnum } from "@/app/enums/stateEnum";
import MarkAsSoldForm from "@/app/components/forms/MarkAsSoldForm";

interface ProfilePageProps {
    session: Session | null; // Accepts session as a prop
}

export default function ProfilePage({ session }: ProfilePageProps) {
    const [userAds, setUserAds] = useState([]);

    // Fetch all user items
    useEffect(() => {
        async function fetchUserItems() {
            if (!session?.user?.id) return;

            try {
                const response = await fetch(`/api/getItemsByUser?id=${session.user.id}`);
                if (!response.ok) throw new Error("Failed to fetch user items");

                const data = await response.json();
                setUserAds(data);
            } catch (error) {
                console.error("Error fetching user items:", error);
            }
        }

        fetchUserItems();
    }, [session?.user?.id]);

    if (!session) {
        return (
            <Container
                sx={{
                    mt: 10,
                    maxWidth: "lg",
                    textAlign: "center",
                    paddingBottom: "64px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
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
                    Morate biti prijavljeni za pristup ovoj stranici!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "1rem",
                    }}
                >
                    Prijavite se sada kako biste pristupili svom profilu i upravljali oglasima.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
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
                </Box>
            </Container>
        );
    }

    return (
        <Container
            sx={{
                mt: 10,
                maxWidth: "lg",
                textAlign: "center",
                paddingBottom: "64px",
            }}
        >
            <Box>
                {/* Welcome Section */}
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
            </Box>

            <ProfileEditForm id={session.user?.id || "testek"}/>

            {/* User Ads */}
            <Box sx={{ mt: 6 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Vaši Oglasi:
                </Typography>
                {userAds.length > 0 ? (
                    <Grid container spacing={4} justifyContent="center" sx={{ mt: 0 }}>
                        {userAds.map((item: any) => (
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="/images/banner1.jpg" // Placeholder image
                                        alt={item.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                fontFamily: "'Poppins', sans-serif",
                                                fontWeight: "600",
                                                color: "#003049",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                fontFamily: "'Poppins', sans-serif",
                                                fontWeight: "600",
                                                color: "#003049",
                                            }}
                                        >
                                            Stanje: {stateEnum[item.itemchangestate[0].stateid]}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: "'Roboto', sans-serif",
                                                color: "text.secondary",
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#003049",
                                                marginTop: "8px",
                                            }}
                                        >
                                            Cijena: {item.askingprice}€
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                                bgcolor: "#FFC300",
                                                color: "#003049",
                                                fontWeight: "600",
                                                "&:hover": {
                                                    bgcolor: "#E5A800",
                                                },
                                            }}
                                            href={`/item?id=${item.id}`}
                                        >
                                            Detalji
                                        </Button>
                                        <DeleteAdForm id={item.id} />
                                        <MarkAsSoldForm id={item.id} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ mt: 4, textAlign: "center", color: "gray" }}
                    >
                        Trenutno nemate oglasa.
                    </Typography>
                )}
            </Box>

            {/* New Ad Button */}
            <Box sx={{ mt: 4 }}>
                <Link href="/newAd" passHref>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#003049",
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
            </Box>

            {/* Sign Out Button */}
            <Box sx={{ mt: 3.5 }}>
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
                    }}
                    onClick={() => signOut()}
                >
                    Odjava
                </Button>
            </Box>
        </Container>
    );
}
