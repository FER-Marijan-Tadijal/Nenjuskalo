
import { prisma } from "@/prisma"

export async function POST(request: Request) {
    const body = await request.json();
    const senderID = body.senderid;
    const receiverID = body.receiverid;

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
            senttime: "desc"
        }
    });

    // Mark newest receiver message as read.
    let newestMessage = await prisma.message.findMany({
        where: {
            senderid: receiverID,
            receiverid: senderID,
        },
        orderBy: {
            senttime: "desc",
        },
        take: 1,
    })

    if (newestMessage.length != 0) {
        let newestMessageID = newestMessage[0].id
        await prisma.message.update({
            where: {
                id: newestMessageID,
            },
            data: {
                seentime: new Date(),
            },
        })
    }

    return Response.json(data)
}