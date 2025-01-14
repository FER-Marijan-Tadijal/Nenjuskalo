
import React from "react";
import { auth } from "@/app/auth";
import EditAdForm from "@/app/components/forms/EditAdForm";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default async function editAd({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const session = await auth();
    const itemId = parseInt((await params).id);

    if (session == null) {
        return (
            <Container
                sx={{
                    textAlign: "center",
                    mt: 10,
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
                    Morate biti prijavljeni za ažuriranje oglasa!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "1rem",
                    }}
                >
                    Prijavite se sada kako biste ažurirali oglas i pronašli
                    kupce!
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#FFC300",
                        color: "#003049",
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                        "&:hover": {
                            bgcolor: "#E5A800",
                        },
                        textTransform: "uppercase",
                        px: 4,
                    }}
                    href="/auth/signin" // Update with the actual sign-in route
                >
                    Prijavi se
                </Button>
            </Container>
        );
    }

    return (
        <Container
            sx={{
                mt: 14,
                mb: 10,
                maxWidth: "md",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
            }}
        >

            {/* Edit Ad Form */}
            <Box
                sx={{
                    bgcolor: "#003049",
                    padding: 4,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                }}
            >
                <EditAdForm id={itemId}/>
            </Box>

            {/* Back to Profile */}
            <Box sx={{ mt: 1.5 ,textAlign: "center", width: "100%" }}>
                <Link href="/profile" passHref>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#003049",
                            borderColor: "#FFC300",
                            fontWeight: "bold",
                            fontFamily: "'Poppins', sans-serif",
                            "&:hover": {
                                bgcolor: "#FFC300",
                                color: "#003049",
                                borderColor: "#FFC300",
                            },
                            textTransform: "uppercase",
                            px: 4,
                        }}
                    >
                        Povratak na Profil
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
