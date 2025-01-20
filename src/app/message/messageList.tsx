"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";

export default function MessageList({
    senderID,
    receiverID,
}: {
    senderID: string;
    receiverID: string;
}) {
    const [messages, setMessages] = useState<{
        id: number;
        content: string;
        senttime: Date;
        seentime: Date | null;
        senderid: string;
        receiverid: string;
    }[]>([]);

    const theme = useTheme(); // Access the theme for breakpoints
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small

    useEffect(() => {
        async function fetchPosts() {
            const intervalid = setInterval(async () => {
                const res = await fetch("/api/getMessages", {
                    method: "POST",
                    body: JSON.stringify({ senderid: senderID, receiverid: receiverID }),
                });
                const data = await res.json();

                setMessages(data);
            }, 1000);

            return () => clearInterval(intervalid); // Cleanup interval on component unmount
        }

        fetchPosts();
    }, [senderID, receiverID]);

    if (!messages) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body1" sx={{ color: "gray" }}>
                    Učitavam poruke...
                </Typography>
            </Box>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                flex: 1,
                overflowY: "auto",
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                    width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#FFC300",
                    borderRadius: "8px",
                },
                maxHeight: isSmallScreen ? "300px" : "400px", // Adjust height for small screens
                width: "100%", // Ensure it takes full width of the container
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    color: "#003049",
                    mb: 2,
                    textAlign: isSmallScreen ? "center" : "left", // Center-align title on small screens
                }}
            >
                Razgovor:
            </Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {messages
                    .slice() // Create a shallow copy to avoid mutating state
                    .reverse() // Reverse the order of messages
                    .map((message) => (
                        <ListItem
                            key={message.id}
                            sx={{
                                alignSelf:
                                    message.senderid === senderID ? "flex-end" : "flex-start",
                                bgcolor:
                                    message.senderid === senderID
                                        ? "#FFC300" // Yellow for sent messages
                                        : "#E5E5E5", // Gray for received messages
                                color: message.senderid === senderID ? "#003049" : "black",
                                borderRadius: "8px",
                                maxWidth: isSmallScreen ? "85%" : "70%", // Wider on small screens
                                p: 1,
                                mb: 1,
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                fontSize: isSmallScreen ? "0.9rem" : "1rem", // Smaller font size on small screens
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            wordBreak: "break-word",
                                            fontSize: isSmallScreen ? "0.85rem" : "1rem", // Adjust text size
                                        }}
                                    >
                                        {message.content}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "gray",
                                            fontSize: isSmallScreen ? "0.6rem" : "0.75rem", // Smaller timestamp font
                                        }}
                                    >
                                        {new Date(message.senttime).toLocaleTimeString("hr-HR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
}
