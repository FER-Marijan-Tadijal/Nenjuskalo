"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";

export default function MessageList({
    senderID,
    receiverID,
}: {
    senderID: string;
    receiverID: string;
}) {
    let pathname = usePathname();

    const [messages, setMessages] = useState<{
        id: number;
        content: string;
        senttime: Date;
        seentime: Date | null;
        senderid: string;
        receiverid: string;
    }[]>([]);

    useEffect(() => {
        let intervalid : any;
        async function fetchPosts() {
            intervalid = setInterval(async () => {
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

        return () => clearInterval(intervalid)
    }, [senderID, receiverID, pathname]);

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
            <List sx={{ display: "flex", flexDirection: "column-reverse", height: "300px", gap: 1 }}>
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
                                        sx={{ color: "gray", fontSize: "0.6rem" }}
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
