import { getCategory } from "@/app/util/getFromId";

export async function GET(request: Request) {
    const idAsString = (new URL(request.url).searchParams.get('id')) ?? "0";

    if (!idAsString) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }

    const id = parseInt(idAsString);
    
    const item = await getCategory(id);

    return Response.json(item);
}