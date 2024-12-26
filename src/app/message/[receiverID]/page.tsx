import { Container, Typography, Box } from "@mui/material";
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
    const receiverID = (await params).receiverID;
    const session = await auth();
    const senderID = session?.user?.id;

    if (senderID == undefined) return <SignInProp />;

    let receiver = await prisma.user.findFirst({
        where: {
            id: receiverID,
        },
    });

    return (
        <Container
            maxWidth="md"
            sx={{
                bgcolor: "black",
                color: "white",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box textAlign="center">
                <div>
                    You are currently messaging: {receiver?.name} with ID:{" "}
                    {receiverID}
                </div>

                <MessageList senderID={senderID} receiverID={receiverID} />
            </Box>

            <SendMessages senderid={senderID} receiverid={receiverID} />
        </Container>
    );
}
