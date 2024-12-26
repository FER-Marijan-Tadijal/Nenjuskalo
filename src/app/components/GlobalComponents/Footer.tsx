
import React from "react";
import Link from "next/link";
import { Box, Typography, Grid } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import registerSiteUser from "@/app/util/registerSiteUser";
import { auth } from "@/app/auth";

async function Footer() {
    // Note: These two lines create the siteuser if he does not exist. Do not remove pls kthxbai.
    const session = await auth()
    if (session != null) await registerSiteUser(session.user?.id ?? "")

    return (
        <Box
            component="footer"
            sx={{
                width: "100%", // Ensure full width
                overflow: "hidden",
                backgroundColor: "#003049",
                color: "#F1E9DA",
                py: 6,
                px: 2,
                boxSizing: "border-box",
            }}
        >
            <Box sx={{ maxWidth: "1200px", mx: "auto", px: 4 }}>
                <Grid container spacing={4} justifyContent="space-between">
                    {/* About Us Section */}
                    <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
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
                            O nama
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "1.6",
                                fontSize: "0.9rem",
                            }}
                        >
                            Šnjofalica je DRUGI najveći i najpopularniji internetski oglasnik u Hrvatskoj koji svakodnevno spaja stotine tisuća kupaca i prodavatelja. 
                            <br />
                            <br />
                            Naša platforma omogućuje trgovanje između pojedinaca, putem sigurnog, jednostavnog i intuitivnog okruženja.
                        </Typography>
                    </Grid>

                    {/* Contact Section */}
                    <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
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
                            Kontakt
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "1.6",
                                fontSize: "0.9rem",
                            }}
                        >
                            1234 Ime Ulice, Grad, Država, Zip
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "1.6",
                                fontSize: "0.9rem",
                            }}
                        >
                            Tel: (123) 456-7890
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "1.6",
                                fontSize: "0.9rem",
                            }}
                        >
                            Email: imeprezime@mail.com
                        </Typography>
                    </Grid>

                    {/* Social Media Section */}
                    <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
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
                            Pratite nas
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Link href="https://github.com/FER-Marijan-Tadijal/Nenjuskalo" passHref>
                                <GitHub
                                    sx={{
                                        color: "#F1E9DA",
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "#FFC300", // Change color on hover
                                        },
                                        fontSize: "2.5rem", // Larger icon size
                                    }}
                                />
                            </Link>
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
                        &copy; {new Date().getFullYear()} FER. Ova stranica napravljena je u sklopu kolegija "Projekt R"
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
