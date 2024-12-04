// Note: This may be deleted yet. Must check SWR and client-side fetching

import { prisma } from "@/prisma"

export async function GET({
    params,
}: {
    params: Promise<{ users: string[] }>
}) {
    const senderID = (await params).users[0]
    const receiverID = (await params).users[1]

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
   
    return Response.json({ data })
  }