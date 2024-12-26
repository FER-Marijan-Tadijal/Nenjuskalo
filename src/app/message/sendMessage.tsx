"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { sendMyMessage } from "./actions"; // Import server action

export default function SendMessages({
    senderid,
    receiverid,
}: {
    senderid: string;
    receiverid: string;
}) {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Call the server action
        await sendMyMessage({
            content: message,
            senderid,
            receiverid,
        });

        // Clear the input field after sending the message
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 4,
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <TextField
                    name="content"
                    placeholder="Aa"
                    required
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        bgcolor: "#ffffff",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    inputProps={{
                        style: {
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "1rem",
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: "#003049",
                        color: "#FFC300",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        "&:hover": {
                            bgcolor: "#1C4A6E",
                        },
                    }}
                >
                    Pošalji
                </Button>
            </Box>
        </form>
    );
}
