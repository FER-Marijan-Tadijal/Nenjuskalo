"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleNewPictureForm(formData: FormData) {
    const session = await auth();

    if (session) {
        const id = parseInt(formData.get("id") as string);

        // Provjera postoji li item i je li user vlasnik
        const item = await prisma.item.findFirst({
            where: { id: id },
        });

        if (item?.sellerid !== session.user?.id) {
            console.log("Not authorized to edit");
            return;
        }

        // Brojanje postojećih slika za određeni item
        const noofpics = await prisma.picture.count({
            where: { itemid: id },
        });

        // Dohvaćanje slike iz forme
        const picture = formData.get("picture") as File;

        let data = null;

        // ✅ Ispravljeno: Pretvaranje slike u buffer
        if (picture && typeof picture === "object") {
            const arrayBuffer = await picture.arrayBuffer();
            data = Buffer.from(arrayBuffer);  // Ispravno pretvaranje slike u buffer
        }

        // Spremanje slike u bazu ako postoji podatak
        if (data) {
            await prisma.picture.create({
                data: {
                    itemid: id,
                    index: noofpics,
                    picdata: data,
                },
            });
        }
    }
}
