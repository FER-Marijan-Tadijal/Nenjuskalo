import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";  // Povezivanje s bazom

// 🚀 GET Request za dohvaćanje nepročitanih poruka
export async function GET(req: NextRequest) {
    try {
        // 📥 Dohvaćanje ID-a iz query parametara
        const userId = req.nextUrl.searchParams.get("id");
        const senderId = req.nextUrl.searchParams.get("senderId") || null;

        if (!userId) {
            return NextResponse.json({ error: "Nedostaje ID korisnika." }, { status: 400 });
        }

        let unreadCount = 0

        // 📊 Brojanje nepročitanih poruka (seentime === null)
        if (!senderId) {
            unreadCount = await prisma.message.count({
                where: {
                    receiverid: userId,
                    seentime: null, // Nepročitane poruke
                },
            });
        }
        else {
            unreadCount = await prisma.message.count({
                where: {
                    receiverid: userId,
                    senderid: senderId,
                    seentime: null, // Nepročitane poruke
                },
            });
        }
        

        // ✅ Vraćanje broja nepročitanih poruka
        return NextResponse.json({ unreadCount });
    } catch (error) {
        console.error("Greška pri dohvaćanju nepročitanih poruka:", error);
        return NextResponse.json({ error: "Greška na serveru." }, { status: 500 });
    }
}
