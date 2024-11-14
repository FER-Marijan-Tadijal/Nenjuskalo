"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "vp",
        overflow: "hidden",
        backgroundColor: "#003049", 
        color: "#F1E9DA", 
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFC300", 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                fontSize: "0.9rem",
              }}
            >
              We are a company dedicated to providing the best products and services to our customers. Learn more about our story and team.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFC300", 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {["Home", "About", "Contact"].map((label) => (
                <Link href={`/${label.toLowerCase()}`} key={label} passHref>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Roboto', sans-serif",
                      color: "inherit",
                      textDecoration: "none",
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": {
                        color: "#FFC300", // On hover
                      },
                    }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFC300",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                fontSize: "0.9rem",
              }}
            >
              1234 Street Name, City, State, Zip
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                fontSize: "0.9rem",
              }}
            >
              Phone: (123) 456-7890
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                lineHeight: "1.6",
                fontSize: "0.9rem",
              }}
            >
              Email: info@example.com
            </Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFC300", 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <Link href="#" key={index} passHref>
                  <Icon
                    sx={{
                      color: "#F1E9DA", 
                      cursor: "pointer",
                      "&:hover": {
                        color: "#FFC300", // On hover
                      },
                      fontSize: "1.8rem",
                    }}
                  />
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Text */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.9rem",
            }}
          >
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
