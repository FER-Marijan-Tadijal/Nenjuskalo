import { Container, Typography, Box, Paper } from "@mui/material";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import SendMessages from "@/app/message/sendMessage";
import MessageList from "@/app/message/messageList";
import SignInProp from "@/app/components/MessageComponents/SignInProp";

export default async function Page({
    params,
}: {
    params: Promise<{ receiverID: string }>;
}) {
    const { receiverID } = await params; 
    const session = await auth();
    const senderID = session?.user?.id;

    if (!senderID) {
        return (
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h5">Morate biti prijavljeni da biste slali poruke.</Typography>
            </Container>
        );
    }

    const receiver = await prisma.user.findFirst({
        where: { id: receiverID },
    });

    return (
        <Container
            sx={{
                height: "80vh", // Full height of the viewport
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
                    color: "#003049",
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
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                        color: "#ffffff",
                    }}
                >
                    Trenutni sugovornik: <span style={{ color: "#FFC300" }}>{receiver?.name || "Nepoznati Korisnik"}</span>
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
