import { Container, Typography, Box } from "@mui/material";
import Component from "@/app/Component";
import { auth } from "@/app/auth"
import { prisma } from "@/prisma";
//import MessageList from "@/app/message/messageList";

export default async function Page({
    params,
  }: {
    params: Promise<{ receiverID: string }>
  }) {
    const receiverID = (await params).receiverID
    const session = await auth();
    const senderID = session?.user?.id;

    if (senderID == undefined)
        return (<p>You must be signed in to message people </p>)

    let messages = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderid: senderID,
                    receiverid: receiverID,
                },
                {
                    senderid: receiverID,
                    receiverid: senderID,
                }
            ],
        },
        orderBy: {
            senttime: "desc"
        }
        });
    let receiver = await prisma.user.findFirst({
        where: {
            id: receiverID
        }
    });

    return (
        <Container maxWidth="md" sx={{ bgcolor: "black", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box textAlign="center">
                <Component />
                <div>You are currently messaging: {receiver?.name} with ID: { receiverID }</div>

                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>

            </Box>
        </Container>
    );
}

