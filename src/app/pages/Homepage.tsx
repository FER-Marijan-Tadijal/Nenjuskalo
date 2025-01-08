"use client";

import React, { useState, useEffect, use } from "react";
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

type Category = {
    id: number;
    name: string;
    supercategoryid: string | null;
};

export default function HomePage() {
    // Fetch 4 random items

    const [randomItems, setRandomItems] = useState([]);
    const [categories, setCategories] = useState<Category[]>();

    const getCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/categories",
                { method: "GET" }
            );

            if (response) {
                const categories = await response.json();
                setCategories(categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function fetchRandomItems() {
            try {
                const response = await fetch("/api/random?n=4");
                if (!response.ok)
                    throw new Error("Failed to fetch random items");

                const data = await response.json();
                setRandomItems(data);
            } catch (error) {
                console.error("Error fetching random items:", error);
            }
        }

        fetchRandomItems();
        getCategories();
    }, []);

    // Fetch 4 newest items

    const [newestItems, setNewestItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        async function fetchNewestItems() {
            try {
                const response = await fetch("/api/newestAds?n=4"); // Fetch 4 newest items
                if (!response.ok) {
                    throw new Error("Failed to fetch newest items");
                }
                const data = await response.json();
                setNewestItems(data);
            } catch (error) {
                console.error("Error fetching newest items:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNewestItems();
    }, []);

    // Render the homepage
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
                    href="/explore"
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
                    {categories &&
                        categories.map((category, index) => (
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
                                    href={`categories/${category.id}`}
                                    sx={{
                                        width: "100%",
                                        height: "80px",
                                        borderRadius: "16px",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        fontFamily: "'Poppins', sans-serif",
                                        color: "white",
                                        backgroundColor: "#003049",
                                        boxShadow:
                                            "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                        "&:hover": {
                                            backgroundColor: "#1c4a6e",
                                            transform: "scale(1.05)",
                                            boxShadow:
                                                "0px 6px 15px rgba(0, 0, 0, 0.3)",
                                        },
                                        transition:
                                            "transform 0.2s ease-in-out",
                                    }}
                                >
                                    {category.name}
                                </Button>
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {/* Newest Products Section */}
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
                    {newestItems.length > 0 ? (
                        newestItems.map((item: any) => (
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
                                        image="/images/banner1.jpg" // Placeholder image
                                        alt={item.title}
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
                            Učitavam Najnovije Artikle...
                        </Typography>
                    )}
                </Grid>
            </Box>

            {/* Random Section */}
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
                                        image="/images/banner1.jpg" // Placeholder image
                                        alt={item.title}
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
                            Učitavam popularne artikle...
                        </Typography>
                    )}
                </Grid>
            </Box>

        </Container>
    );
}
