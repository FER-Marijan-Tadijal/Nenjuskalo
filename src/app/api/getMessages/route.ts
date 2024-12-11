
import { prisma } from "@/prisma"

export function GET() {
    return Response.json("Stop touching my api.");
}

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

    return Response.json(data)
}