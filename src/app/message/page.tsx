import { Container, Typography } from "@mui/material";
import { auth } from "@/app/auth";
import { getListOfConversations } from "@/app/message/utilFunctions";
import ConversationsList from "./ConversationsList"; // Import client component

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

    // Filter out invalid users (those without an ID)
    const validUsers = users
        .filter((user) => user.id) // Ensure ID exists
        .map((user) => ({
            id: user.id!,
            name: user.name || "Nepoznati Korisnik",
            unreadCount: user.unreadCount || 0,
        }));

    return <ConversationsList users={validUsers} />;
}
