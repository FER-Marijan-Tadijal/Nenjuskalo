// File: page.tsx (Server Component)
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import SendMessages from "@/app/message/sendMessage";
import MessageList from "@/app/message/messageList";
import BackButton from "../BackButton";

export default async function Page({
    params,
}: {
    params: { receiverID: string };
}) {
    const { receiverID } = params;
    const session = await auth();
    const senderID = session?.user?.id;

    if (!senderID) {
        return (
            <Container
                sx={{
                    mt: 10,
                    maxWidth: "lg",
                    textAlign: "center",
                    paddingBottom: "64px",
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
                    Morate biti prijavljeni za pristup ovoj stranici!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "1rem",
                    }}
                >
                    Prijavite se sada kako biste pristupili svom profilu i upravljali oglasima.
                </Typography>
            </Container>
        );
    }

    const receiver = await prisma.user.findFirst({
        where: { id: receiverID },
    });

    return (
        <Container
            sx={{
                height: "95vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
            }}
        >
            <Box
                maxWidth="md"
                sx={{
                    bgcolor: "#003049",
                    color: "#ffffff",
                    p: 4,
                    borderRadius: "12px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    border: "2px solid #FFC300",
                }}
            >
                <BackButton />

                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    Trenutni sugovornik:{" "}
                    <span style={{ color: "#FFC300" }}>
                        {receiver?.name || "Nepoznati Korisnik"}
                    </span>
                </Typography>

                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        borderRadius: "12px",
                        maxHeight: "400px",
                        overflowY: "auto",
                        bgcolor: "#ffffff",
                        border: "1px solid #FFC300",
                    }}
                >
                    <MessageList senderID={senderID} receiverID={receiverID} />
                </Paper>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <SendMessages senderid={senderID} receiverid={receiverID} />
                </Box>
            </Box>
        </Container>
    );
}
