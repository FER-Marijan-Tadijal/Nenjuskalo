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
import { stateEnum } from "@/app/enums/stateEnum";

// Custom font styles
const titleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
};

const subtitleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
};

const bodyStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "400",
    lineHeight: "1.6",
};

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
                        mb: 2,
                    }}
                />
            </Box>

            <ProfileEditForm id={session.user?.id || "testek"} />

            {/* User Ads */}
            <Box sx={{ width: "100%", marginTop: "40px" }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 1,
                    }}
                >
                    Vaši Oglasi:
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {userAds.length > 0 ? (
                        userAds.map((item: any) => (
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "100%", // Ensure consistent height
                                        maxHeight: "350px", // Optional: Limit height
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                        border: "3px solid #003049", // Add border
                                        borderRadius: "8px", // Add border radius
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140" // Fixed height for image
                                        image={`/api/image?id=${item.id}&index=0`} // Dynamic image from API
                                        alt={item.title}
                                        sx={{ objectFit: "cover" }} // Ensures the image fits nicely
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1, // Ensures content stretches
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                ...subtitleStyle,
                                                color: "#003049",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
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
                                            Stanje: {item.itemchangestate?.[0]?.stateid ? stateEnum[item.itemchangestate[0].stateid] : "Nije definirano"}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ...bodyStyle,
                                                color: "text.secondary",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
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
                                    </CardContent>
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
                                        href={`/item/${item.id}`}
                                    >
                                        Detalji
                                    </Button>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            sx={{ textAlign: "center", color: "gray", mt: 4 }}
                        >
                            Učitavam Vaše Artikle...
                        </Typography>
                    )}
                </Grid>
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
