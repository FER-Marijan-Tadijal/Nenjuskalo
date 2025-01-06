"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import CarouselComponent from "../components/GlobalComponents/Carousel";

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

export default function HomePage() {
    const [randomItems, setRandomItems] = useState([]);

    // Fetch 7 random items
    useEffect(() => {
        async function fetchRandomItems() {
            try {
                const response = await fetch("/api/random?n=4");
                if (!response.ok) throw new Error("Failed to fetch random items");

                const data = await response.json();
                setRandomItems(data);
            } catch (error) {
                console.error("Error fetching random items:", error);
            }
        }

        fetchRandomItems();
    }, []);

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "64px",
                paddingBottom: "64px",
            }}
        >
            {/* Main Banner/Carousel Section */}
            <Box sx={{ width: "95%", mb: 4 }}>
                <CarouselComponent />
            </Box>

            {/* Hero Section */}
            <Box sx={{ marginBottom: "10px", textAlign: "center" }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{ ...titleStyle, color: "#FFC300", fontSize: "2.5rem" }}
                >
                    Dobrodošli u Šnjofalicu!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        ...bodyStyle,
                        color: "text.secondary",
                        fontSize: "1.1rem",
                    }}
                >
                    Pogledajte našu ponudu i pronađite ono što vam je potrebno!
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#FFC300",
                        color: "#003049",
                        mt: 4,
                        fontWeight: "600",
                        textTransform: "uppercase",
                        "&:hover": { bgcolor: "#E5A800" },
                    }}
                >
                    Istraži!
                </Button>
            </Box>

            {/* Category Links Section */}
            <Box sx={{ width: "100%", marginY: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        ...titleStyle,
                        color: "#FFC300",
                        fontSize: "2rem",
                        marginBottom: "30px",
                    }}
                >
                    Istraži Kategorije
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {[
                        { label: "Auto Moto" },
                        { label: "Nekretnine" },
                        { label: "Nekretnine" },
                        { label: "Pijac" },
                        { label: "Odjevni predmeti" },
                        { label: "Militarija" },
                    ].map((category, index) => (
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={2}
                            key={index}
                            sx={{ textAlign: "center" }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    height: "80px",
                                    borderRadius: "16px",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    fontFamily: "'Poppins', sans-serif",
                                    color: "white",
                                    backgroundColor: "#003049",
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                    "&:hover": {
                                        backgroundColor: "#1c4a6e",
                                        transform: "scale(1.05)",
                                        boxShadow:
                                            "0px 6px 15px rgba(0, 0, 0, 0.3)",
                                    },
                                    transition: "transform 0.2s ease-in-out",
                                }}
                            >
                                {category.label}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Featured Products Section */}
            <Box sx={{ width: "100%", marginTop: "40px" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        ...titleStyle,
                        color: "#FFC300",
                        fontSize: "2rem",
                    }}
                >
                    Najnoviji Proizvodi
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                {randomItems.length > 0 ? (
                        randomItems.map((item: any) => (
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
                                                ...subtitleStyle,
                                                color: "#003049",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ...bodyStyle,
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
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            sx={{ textAlign: "center", color: "gray", mt: 4 }}
                        >
                            Učitavam istaknute artikle...
                        </Typography>
                    )}
                </Grid>
            </Box>

            {/* Popular Section */}
            <Box sx={{ width: "100%", marginTop: "40px" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        ...titleStyle,
                        color: "#FFC300",
                        fontSize: "2rem",
                    }}
                >
                    Nasumično Odabrani Proizvodi
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {randomItems.length > 0 ? (
                        randomItems.map((item: any) => (
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
                                                ...subtitleStyle,
                                                color: "#003049",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ...bodyStyle,
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
                                            Cijena: {item.askingprice}€                                       </Typography>
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
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            sx={{ textAlign: "center", color: "gray", mt: 4 }}
                        >
                            Učitavam popularne artikle...
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}
