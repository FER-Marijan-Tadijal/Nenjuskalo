"use client"

//import { Container, Typography, Box, ThemeProvider } from "@mui/material";
//import ItemView from "./pages/ItemViewPage";
//import NotFoundPage from "./pages/NotFoundPage";
//import ExplorePage from "./pages/ExplorePage";
//import theme from "./styles/theme";
//import ProfilePage from "./pages/ProfilePage";
import Component from "@/app/Component";

//import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import Link from "next/link";

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
      <Box sx={{ width: "100%", mb: 4 }}>
        <Carousel
          navButtonsAlwaysVisible
          navButtonsProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
            },
          }}
          indicators={true}
        >
          {[
            { image: "/images/banner1.jpg", title: "Discover Amazing Deals" },
            { image: "/images/banner2.jpg", title: "Find Your Next Favorite Product" },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100%",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <Typography
                variant="h3"
                sx={{
                  ...titleStyle,
                  color: "#F1E9DA", 
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  zIndex: 1,
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Hero Section */}
      <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
        <Typography variant="h2" gutterBottom sx={{ ...titleStyle, color: "#FFC300", fontSize: "2.5rem" }}> 
          Welcome to Šnjofalica!
        </Typography>
        <Typography variant="body1" sx={{ ...bodyStyle, color: "text.secondary", fontSize: "1.1rem" }}>
          Discover amazing deals and browse our wide selection of products.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FFC300", 
            color: "#003049", 
            mt: 2,
            fontWeight: "600",
            textTransform: "uppercase",
            "&:hover": { bgcolor: "#E5A800" },
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Category Links Section */}
      <Box sx={{ width: "100%", marginY: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", ...titleStyle, color: "#FFC300", fontSize: "2rem" }}> {/* Yellow */}
          Explore Categories
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { label: "Auto Moto Nautika" },
            { label: "Nekretnine" },
            { label: "Marketplace" },
            { label: "Turistički smještaj" },
            { label: "Katalozi" },
            { label: "Poslovi" },
          ].map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ textAlign: "center" }}>
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
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
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
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", ...titleStyle, color: "#FFC300", fontSize: "2rem" }}> 
          Featured Products
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/banner1.jpg"
                  alt="Featured Product"
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ ...subtitleStyle, color: "#003049" }}> 
                    Product Name
                  </Typography>
                  <Typography variant="body2" sx={{ ...bodyStyle, color: "text.secondary" }}>
                    Description of the product.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: "#FFC300", 
                      color: "#003049", 
                      fontWeight: "600",
                      "&:hover": { bgcolor: "#E5A800" },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommended/Popular Items Section */}
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", ...titleStyle, color: "#FFC300", fontSize: "2rem" }}> 
          Recommended for You
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3, 4].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/banner2.jpg"
                  alt="Recommended item"
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ ...subtitleStyle, color: "#003049" }}> 
                    Item Title
                  </Typography>
                  <Typography variant="body2" sx={{ ...bodyStyle, color: "text.secondary" }}>
                    Description of the item.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: "#FFC300", 
                      color: "#003049", 
                      fontWeight: "600",
                      "&:hover": { bgcolor: "#E5A800" },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <Link href={"/categories"}>Go to Category Selection</Link>
        <Component />
      </Box>
    </Container>
  );
}