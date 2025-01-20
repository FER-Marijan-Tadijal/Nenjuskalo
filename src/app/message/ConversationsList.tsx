"use client";

import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Button,
    Badge,
    useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface ConversationsListProps {
    users: {
        id: string;
        name: string;
        unreadCount: number;
    }[];
}

export default function ConversationsList({ users }: ConversationsListProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container
            sx={{
                height: "auto",
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                p: isSmallScreen ? 2 : 4,
            }}
        >
            <Box
                sx={{
                    mt: isSmallScreen ? 6 : 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#003049",
                    p: isSmallScreen ? 3 : 4,
                    borderRadius: "12px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                    border: "2px solid #FFC300",
                    width: "100%",
                    maxWidth: isSmallScreen ? "100%" : "600px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                        color: "#f5f5f5",
                        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                    }}
                >
                    Otvoreni razgovori:
                </Typography>

                {users.length > 0 ? (
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: "12px",
                            maxHeight: isSmallScreen ? "200px" : "300px",
                            overflowY: "auto",
                            bgcolor: "#ffffff",
                            p: isSmallScreen ? 1 : 2,
                            border: "1px solid #FFC300",
                            width: "100%",
                        }}
                    >
                        <List>
                            {users.map((user) => (
                                <ListItem
                                    key={user.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "#E5F4FF",
                                            transform: "scale(1.02)",
                                            transition: "transform 0.2s ease-in-out",
                                        },
                                        borderRadius: "8px",
                                        mb: 1,
                                        p: isSmallScreen ? 0.5 : 1,
                                    }}
                                >
                                    <Link
                                        href={`/message/${user.id}`}
                                        passHref
                                        style={{
                                            textDecoration: "none",
                                            color: "#003049",
                                            width: "100%",
                                            display: "block",
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "'Roboto', sans-serif",
                                                            fontSize: isSmallScreen ? "0.9rem" : "1rem",
                                                            color: "#003049",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {user.name || "Nepoznati Korisnik"}
                                                    </Typography>
                                                    {user.unreadCount > 0 && (
                                                        <Badge
                                                            badgeContent={user.unreadCount}
                                                            color="secondary"
                                                            sx={{
                                                                "& .MuiBadge-badge": {
                                                                    backgroundColor: "#FFC300",
                                                                    color: "#003049",
                                                                    fontSize: isSmallScreen ? "0.7rem" : "0.8rem",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: "'Roboto', sans-serif",
                            textAlign: "center",
                            color: "#FFC300",
                            opacity: 0.8,
                            fontWeight: "bold",
                            fontSize: isSmallScreen ? "0.9rem" : "1rem",
                        }}
                    >
                        Trenutno nemate otvorenih razgovora.
                    </Typography>
                )}

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#FFC300",
                        color: "#003049",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        mt: isSmallScreen ? 3 : 4,
                        px: isSmallScreen ? 3 : 4,
                        py: isSmallScreen ? 1 : 1.5,
                        borderRadius: "8px",
                        fontSize: isSmallScreen ? "0.9rem" : "1rem",
                        "&:hover": {
                            bgcolor: "#E5A800",
                        },
                    }}
                    href="/"
                >
                    Povratak na početnu
                </Button>
            </Box>
        </Container>
    );
}
