"use server";

import { prisma } from "@/prisma";
import { auth } from "@/app/auth";

export async function HandleNewProfileForm(formData: FormData) {
    const session = await auth();

    if (session != null) {
        // Construct update object dynamically
        const updateData: any = {};
        const userId = formData.get("id") as string;

        let siteuser = await prisma.siteuser.findUnique({
            where: {
                id: session.user?.id,
            },
        })

        if ((session.user?.id != userId) && (siteuser?.roleid != 1)) return

        const country = formData.get("country") as string;
        if (country?.trim()) {
            updateData.country = country.trim();
        }

        const city = formData.get("city") as string;
        if (city?.trim()) {
            updateData.city = city.trim();
        }

        const street = formData.get("street") as string;
        if (street?.trim()) {
            updateData.street = street.trim();
        }

        const houseno = formData.get("houseno") as string;
        if (houseno?.trim()) {
            updateData.houseno = houseno.trim();
        }

        // Perform update only if there is data to update
        if (Object.keys(updateData).length > 0) {
            await prisma.siteuser.update({
                where: {
                    id: userId,
                },
                data: updateData,
            });
        }
    }
}
