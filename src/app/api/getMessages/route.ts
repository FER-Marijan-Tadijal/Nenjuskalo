
import { auth } from "@/app/auth";
import { prisma } from "@/prisma"
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
    const body = await req.json();
    const senderID = body.senderid;
    const receiverID = body.receiverid;

    if (req.auth?.user?.id != senderID) {
        return NextResponse.json({ message: "Not authorized" }, { status: 403 })
    }

    let data = await prisma.message.findMany({
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
            senttime: "asc"
        }
    });

    // Mark newest receiver message as read.
    let newestMessages = await prisma.message.findMany({
        where: {
            senderid: receiverID,
            receiverid: senderID,
        },
        orderBy: {
            senttime: "desc",
        },
    })

    for (let message of newestMessages) {
        if (newestMessages.length != 0) {
            let newestMessageID = message.id
            await prisma.message.update({
                where: {
                    id: newestMessageID,
                },
                data: {
                    seentime: new Date(),
                },
            })
        }
    }

    return Response.json(data)
})