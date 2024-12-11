import { prisma } from "@/prisma"
import { auth } from "@/app/auth";
import Link from "next/link";

export default async function Page() {
    const session = await auth();

    if (session == null) {
        return "Please sign in!";
    }
    const userID = session.user?.id || "";

    const users = await getListOfConversations(userID);

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <ul>
                {users.map((user) => (
                    <li key={user?.id}><a href={"/message/" + user?.id}>{user?.name}</a></li>
                ))}
            </ul>
        </>
        
    )
}

// Returns list of  other users. But only of the users that you have exchanged messages with.
async function getListOfConversations(userID: string) {
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

async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    return user
}