import { getCategoryChildren } from "@/app/util/getFromId";

export async function GET(request: Request) {
    const idAsString = (new URL(request.url).searchParams.get('id'))
    let id = null

    if (idAsString != null) {
        id = parseInt(idAsString);
    }
    
    const item = await getCategoryChildren(id);

    return Response.json(item);
}