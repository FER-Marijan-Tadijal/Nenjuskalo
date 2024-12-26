"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

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
                maxHeight: "400px",
                overflowY: "auto",
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    color: "#003049",
                    mb: 2,
                }}
            >
                Razgovor:
            </Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {messages.map((message) => (
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
                            maxWidth: "70%",
                            p: 1,
                            mb: 1,
                            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{ wordBreak: "break-word" }}
                                >
                                    {message.content}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="caption"
                                    sx={{ color: "gray", fontSize: "0.75rem" }}
                                >
                                    {new Date(message.senttime).toLocaleTimeString()}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
