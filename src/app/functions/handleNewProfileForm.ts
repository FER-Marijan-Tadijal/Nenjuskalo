"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";
import { count } from "console";

export async function HandleNewProfileForm(formData: FormData) {

    const session = await auth();
    if (session != null) {
        await prisma.siteuser.update({
            where: {
                id: formData.get("id") as string,
            },
            data: {
                country: formData.get("country") as string,
                city: formData.get("city") as string,
                street: formData.get("street") as string,
                houseno: formData.get("houseno") as string,
            },
        })
    }
}