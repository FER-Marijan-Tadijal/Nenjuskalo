"use client"

import { useState, useEffect } from 'react'

export default function MessageList({ senderID, receiverID } : { senderID: string, receiverID: string}) {
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
        let intervalid = setInterval(async () => {
            let res = await fetch("/api/getMessages", {
                method: "POST",
                body: JSON.stringify({ senderid: senderID, receiverid: receiverID }),
            });
            let data = await res.json();
    
            setMessages(data)
        }, 1000)
        }
    fetchPosts()
    }, [])

    if (!messages) return <div>Loading...</div>

    return (
        <ul>
            {messages.map((message) => (
                <li key={message.id}>{message.content}</li>
            ))}
        </ul>
    )
}