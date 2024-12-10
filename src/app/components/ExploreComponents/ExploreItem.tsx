import React from "react";
import { Box, Typography, Button } from "@mui/material";
import theme from "@/app/styles/theme";

type Props = {
    title: string;
    price: number;
    city: string;
    street: string;
    category: string;
};

const ExploreItem = ({ title, price, city, street, category }: Props) => {
    return (
        <>
            <Box
                sx={{
                    width: "55%",
                    height: "150px",
                    margin: 0.7,
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    border: "1px solid grey",
                    backgroundColor: "#FFFFFF",
                    color: "#1C2B36",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "#FAF3E0",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5hdHVyZXxlbnwwfHx8fDE2MTg4NzU1MjA&ixlib=rb-1.2.1&q=80&w=400"
                        alt="Nature image from Unsplash"
                        style={{
                            width: "250px",
                            height: "145px",
                            borderRadius: 4,
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 2,
                        }}
                    >
                        <Typography variant="body2">• {title}</Typography>
                        <Typography variant="body2">
                            • Price: {price} €
                        </Typography>
                        <Typography variant="body2">
                            • Location: {city}, {street}
                        </Typography>
                        <Typography variant="body2">
                            • Category: {category}
                        </Typography>
                    </Box>
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
                </Box>
            </Box>
        </>
    );
};

export default ExploreItem;
