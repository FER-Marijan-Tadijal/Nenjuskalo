import { getItemsFromUser } from "@/app/util/getFromId";

export async function GET(request: Request) {
    const id = (new URL(request.url).searchParams.get('id'));

    if (!id) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }
    
    const item = await getItemsFromUser(id);

    return Response.json(item);
}