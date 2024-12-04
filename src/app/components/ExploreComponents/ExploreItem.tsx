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
                    width: "60%",
                    margin: 0.5,
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    backgroundColor: "#FFFFFF",
                    color: "#1C2B36",
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5hdHVyZXxlbnwwfHx8fDE2MTg4NzU1MjA&ixlib=rb-1.2.1&q=80&w=400"
                    alt="Nature image from Unsplash"
                    style={{
                        width: "300px",
                        height: "200px",
                        borderRadius: 4,
                    }}
                />
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
                        <Typography variant="h6">• {title}</Typography>
                        <Typography variant="h6">• Price: {price}</Typography>
                        <Typography variant="h6">
                            • Location: {city}, {street}
                        </Typography>
                        <Typography variant="h6">
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
