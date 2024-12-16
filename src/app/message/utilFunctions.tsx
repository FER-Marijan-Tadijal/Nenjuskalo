import { prisma } from "@/prisma";
import { getUser } from "@/app/util/getFromId";

// Returns list of  other users. But only of the users that you have exchanged messages with.
export async function getListOfConversations(userID: string) {
    const distinctConvos = await prisma.message.findMany({
        select: {
            senderid: true,
            receiverid: true,
        },
        distinct: ["senderid", "receiverid"],
    });

    let otherIDs: string[] = [];

    for (let convo of distinctConvos) {
        if ((convo.receiverid != userID) && (!(otherIDs.includes(convo.receiverid)))) {
            otherIDs.push(convo.receiverid);
        }
        if ((convo.senderid != userID) && (!(otherIDs.includes(convo.senderid)))) {
            otherIDs.push(convo.senderid);
        }
        if (convo.senderid == convo.receiverid) {
            otherIDs.push(convo.senderid);
        }
    }

    let userList = [];

    for (let id of otherIDs) {
        userList.push(await getUser(id));
    }

    return userList;
}

export async function getLastMessage(senderID: string, receiverID: string) {
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
        },
        take: 1,
    });

    return data
}

export async function getNumOfUnreads(userID: string) {
    const convos = await getListOfConversations(userID);

    let unreadCount = 0;
    for (let otherID in convos) {
        let lastMessage = await getLastMessage(userID, otherID);
        if (lastMessage[0].seentime == null) {
            unreadCount += 1
        }
    }

    return unreadCount;
}
