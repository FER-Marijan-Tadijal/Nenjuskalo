// Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Typography, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100vw',
        backgroundColor: '#222',
        color: '#fff',
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a company dedicated to providing the best products and services to our customers. Learn more about our story and team.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" passHref>
                <Typography variant="body2" sx={{ color: 'inherit', textDecoration: 'none', mb: 1 }}>
                  Home
                </Typography>
              </Link>
              <Link href="/about" passHref>
                <Typography variant="body2" sx={{ color: 'inherit', textDecoration: 'none', mb: 1 }}>
                  About
                </Typography>
              </Link>
              <Link href="/contact" passHref>
                <Typography variant="body2" sx={{ color: 'inherit', textDecoration: 'none', mb: 1 }}>
                  Contact
                </Typography>
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">1234 Street Name, City, State, Zip</Typography>
            <Typography variant="body2">Phone: (123) 456-7890</Typography>
            <Typography variant="body2">Email: info@example.com</Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="https://facebook.com" passHref>
                <Facebook sx={{ color: '#fff', cursor: 'pointer' }} />
              </Link>
              <Link href="https://twitter.com" passHref>
                <Twitter sx={{ color: '#fff', cursor: 'pointer' }} />
              </Link>
              <Link href="https://instagram.com" passHref>
                <Instagram sx={{ color: '#fff', cursor: 'pointer' }} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Text */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
