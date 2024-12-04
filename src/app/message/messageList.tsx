/*"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { prisma } from "@/prisma"

export default function MessageList({ senderID, receiverID } : { senderID: string, receiverID: string}) {
    const { data: session, status } = useSession();

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
        let res = await fetch('http://localhost:3000/api/getMessages/' + senderID + "/" + receiverID);
        let data = await res.json();
        console.log(data)

        setMessages(data)
        }
    fetchPosts()
    }, [])

    if (!messages) return <div>Loading...</div>

    if (status === "authenticated") {
    return (
        <ul>
            {messages.map((message) => (
                <li key={message.id}>{message.content}</li>
            ))}
        </ul>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}
*/