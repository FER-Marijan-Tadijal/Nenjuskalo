import { prisma } from "@/prisma";

// All the squigglies are OK because parseInt does not throw error exceptions.

const defaultPic = (await prisma.picture.findFirst({
    where: {
        itemid: 0,
        index: 0,
    }
}))?.picdata

export async function GET(request: Request) {
    let reqURL = new URL(request.url)
    const idAsString = (reqURL.searchParams.get('id'));
    if (isNaN(parseInt(idAsString))) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }
    const indexAsString = (reqURL.searchParams.get('index'));
    if (isNaN(parseInt(indexAsString))) {
        
    }

    let id = parseInt(idAsString);
    let index = parseInt(indexAsString);

    const data = await prisma.picture.findFirst({
        where: {
            itemid: id,
            index: index,
        }
    })

    let myPic = data ? data.picdata : defaultPic;

    const blob = new Blob([myPic])

    return new Response(blob);
}