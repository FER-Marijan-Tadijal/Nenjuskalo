import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";  // Povezivanje s bazom

// 🚀 GET Request za dohvaćanje nepročitanih poruka
export async function GET(req: NextRequest) {
    try {
        // 📥 Dohvaćanje ID-a iz query parametara
        const userId = req.nextUrl.searchParams.get("id");

        if (!userId) {
            return NextResponse.json({ error: "Nedostaje ID korisnika." }, { status: 400 });
        }

        // 📊 Brojanje nepročitanih poruka (seentime === null)
        const unreadCount = await prisma.message.count({
            where: {
                receiverid: userId,
                seentime: null, // Nepročitane poruke
            },
        });

        // ✅ Vraćanje broja nepročitanih poruka
        return NextResponse.json({ unreadCount });
    } catch (error) {
        console.error("Greška pri dohvaćanju nepročitanih poruka:", error);
        return NextResponse.json({ error: "Greška na serveru." }, { status: 500 });
    }
}
