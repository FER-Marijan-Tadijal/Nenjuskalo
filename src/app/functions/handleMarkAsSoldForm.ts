"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleMarkAsSoldForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        let id = parseInt(formData.get("id") as string);
        console.log(id);

        await prisma.itemchangestate.create({
            data: {
                itemid: id,
                stateid: 3,
                changetime: new Date(),
            }
        })
    }
}