import {prisma} from "@/prisma";

export async function PUT(request: Request) {
    const idAsString = (new URL(request.url).searchParams.get('id')) ?? "0";
    const id = parseInt(idAsString);
    const body = await request.json();
    const item = await prisma.item.update({
        where: {id},
        data: body,
    });
    return Response.json(item);
}