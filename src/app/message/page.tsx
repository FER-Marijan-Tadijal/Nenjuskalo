import { Container, Typography, Box, List, ListItem, ListItemText, Paper, Button, Badge } from "@mui/material";
import Link from "next/link";
import { auth } from "@/app/auth";
import { getListOfConversations } from "@/app/message/utilFunctions";

export default async function Page() {
    const session = await auth();

    if (!session) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        color: "#003049",
                    }}
                >
                    Molimo vas da se prijavite kako biste vidjeli razgovore.
                </Typography>
            </Container>
        );
    }

    const userID = session.user?.id || "";
    const users = await getListOfConversations(userID);

    return (
        <Container
            sx={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    mt: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#003049",
                    p: 4,
                    borderRadius: "12px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                    border: "2px solid #FFC300",
                    width: "100%",
                    maxWidth: "600px",
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
                    }}
                >
                    Otvoreni razgovori:
                </Typography>

                {users.length > 0 ? (
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: "12px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            bgcolor: "#ffffff",
                            p: 2,
                            border: "1px solid #FFC300", // Border using yellow for subtle contrast
                            width: "100%",
                        }}
                    >
                        <List>
                            {users.map((user) => (
                                <ListItem
                                    key={user?.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "#E5F4FF", // Subtle hover effect with light blue tint
                                            transform: "scale(1.02)",
                                            transition: "transform 0.2s ease-in-out",
                                        },
                                        borderRadius: "8px",
                                        mb: 1,
                                        p: 1,
                                    }}
                                >
                                    <Link
                                        href={`/message/${user?.id}`}
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
                                                            fontSize: "1rem",
                                                            color: "#003049",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {user?.name || "Nepoznati Korisnik"}
                                                    </Typography>
                                                    {user.unreadCount > 0 && (
                                                        <Badge
                                                            badgeContent={user.unreadCount}
                                                            color="secondary"
                                                            sx={{
                                                                "& .MuiBadge-badge": {
                                                                    backgroundColor: "#FFC300",
                                                                    color: "#003049",
                                                                    fontSize: "0.8rem",
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
                        mt: 4,
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px",
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
