"use server";

import { prisma } from "@/prisma";

export async function sendMyMessage({
    content,
    senderid,
    receiverid,
}: {
    content: string;
    senderid: string;
    receiverid: string;
}) {
    // Generate new id and add the message
    let max_id = await prisma.message.aggregate({
        _max: {
            id: true,
        },
    });
    let id = max_id._max.id;
    if (id == null) id = 0;
    else id += 1;

    await prisma.message.create({
        data: {
            id: id,
            content: content,
            senttime: new Date(),
            senderid: senderid,
            receiverid: receiverid,
        },
    });
}
