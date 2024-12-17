import { prisma } from "@/prisma";

export default async function registerSiteUser(id: string) {
    const user = await prisma.user.findUnique({where: {id: id}});
    const siteuser = await prisma.siteuser.findUnique({where: {id: id}});

    console.log(id, user)

    if (user != null && siteuser == null){
        console.log("Making user")
        await prisma.siteuser.create({
            data: {
                id: id,
                roleid: 0,
            },
        })
    }

    return
}