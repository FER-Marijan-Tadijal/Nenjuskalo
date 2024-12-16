import getRandomItems from "@/app/util/random";

export async function GET(request: Request) {
    const numAsString = (new URL(request.url).searchParams.get('n')) ?? "0";

    if (!numAsString) {
        return Response.json({ message: 'Please provide a number', status: 400 });
    }

    const num = parseInt(numAsString);

    const items = await getRandomItems(num)

    return Response.json(items);
}