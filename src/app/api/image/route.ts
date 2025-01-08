import { prisma } from "@/prisma";

export async function GET(request: Request) {
    let reqURL = new URL(request.url)
    const idAsString = (reqURL.searchParams.get('id') || "0");
    if (isNaN(parseInt(idAsString))) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }
    const indexAsString = (reqURL.searchParams.get('index') || "0");
    if (isNaN(parseInt(indexAsString))) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }

    const defaultPic = (await prisma.picture.findFirst({
        where: {
            itemid: 0,
            index: 0,
        }
    }))?.picdata

    let id = parseInt(idAsString);
    let index = parseInt(indexAsString);

    const data = await prisma.picture.findFirst({
        where: {
            itemid: id,
            index: index,
        }
    })

    let myPic = data ? data.picdata : defaultPic;

    let blob
    if (myPic != undefined)
        blob = new Blob([myPic])
    else
        return Response.json({ message: "Something's gone terribly wrong", status: 500 });

    return new Response(blob);
}