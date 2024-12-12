"use client";

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

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
          Access Denied
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
          You must be signed in to view this page.
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
          onClick={() => (window.location.href = "/api/auth/signin")}
        >
          Sign In
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
          onClick={() => (window.location.href = "/api/auth/signout")}
        >
          Odjava
        </Button>
      </Box>
    </Container>
  );
}
