import { prisma } from "@/prisma";
import { getUser } from "@/app/util/getFromId";

// Dohvaća popis razgovora i vraća listu korisnika s brojem nepročitanih poruka
export async function getListOfConversations(userID: string) {
    // 1. Dohvati sve razgovore (jedinstvene po korisnicima)
    const distinctConvos = await prisma.message.findMany({
        select: {
            senderid: true,
            receiverid: true,
        },
        distinct: ["senderid", "receiverid"],
        where: {
            OR: [
                { senderid: userID },
                { receiverid: userID },
            ],
        },
    });

    // 2. Pronađi sve druge korisnike povezane s razgovorima
    let otherIDs: string[] = [];
    for (let convo of distinctConvos) {
        if (convo.receiverid !== userID && !otherIDs.includes(convo.receiverid)) {
            otherIDs.push(convo.receiverid);
        }
        if (convo.senderid !== userID && !otherIDs.includes(convo.senderid)) {
            otherIDs.push(convo.senderid);
        }
    }

    // 3. Dohvati korisnike i njihov broj nepročitanih poruka
    const userList = await Promise.all(
        otherIDs.map(async (id) => {
            const user = await getUser(id); // Dohvaća informacije o korisniku

            // Broji nepročitane poruke za ovog korisnika
            const unreadCount = await prisma.message.count({
                where: {
                    senderid: id, // Poruke od drugog korisnika
                    receiverid: userID, // Primatelj je trenutni korisnik
                    seentime: null, // Poruke nisu pročitane
                },
            });

            return {
                ...user,
                unreadCount, // Dodaj broj nepročitanih poruka
            };
        })
    );

    return userList;
}

// Dohvati posljednju poruku između dva korisnika
export async function getLastMessage(senderID: string, receiverID: string) {
    const data = await prisma.message.findFirst({
        where: {
            OR: [
                { senderid: senderID, receiverid: receiverID },
                { senderid: receiverID, receiverid: senderID },
            ],
        },
        orderBy: {
            senttime: "desc", // Sortiranje prema vremenu slanja
        },
    });

    return data;
}
