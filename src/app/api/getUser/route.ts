import { getUser } from "@/app/util/getFromId";

export async function GET(request: Request) {
    const id = (new URL(request.url).searchParams.get('id')) ?? "0";

    if (!id) {
        return Response.json({ message: 'Please provide an id', status: 400 });
    }

    const items = await getUser(id);

    return Response.json(items);
}