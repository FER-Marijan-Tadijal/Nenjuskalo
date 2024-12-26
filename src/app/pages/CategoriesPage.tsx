import React from "react";
import Link from "next/link";
import {
    Typography,
    Container,
    Box,
    ThemeProvider,
    Button,
} from "@mui/material";
import theme from "../styles/theme";

type category = {
    id: number;
    name: string;
};
type Props = {
    categories: category[];
};

const CategoriesPage = ({ categories }: Props) => {
    return (
        <>
            {categories && (
                <ThemeProvider theme={theme}>
                    {/*<Button
                            variant="accentBtn"
                            href={"/"}
                            sx={{ position: "absolute", top: 0, rigth: 0 }}
                        >
                            Go to front page
                        </Button>*/}

                    <Container sx={{ mt: 8 }}>
                        <Typography
                            variant="h3"
                            fontStyle="oblique"
                            fontWeight="600"
                        >
                            Kategorije:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                mt: 2,
                            }}
                        >
                            {categories.map((category, index) => (
                                <Box key={index} sx={{ height: "100px" }}>
                                    <Button
                                        variant="contained"
                                        href={`/categories/${category.id}`}
                                        sx={{
                                            width: "150px",
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
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </>
    );
};

export default CategoriesPage;
