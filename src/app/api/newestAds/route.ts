import { prisma } from "@/prisma";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const nParam = url.searchParams.get("n");
    const n = nParam ? parseInt(nParam) : 4; // Default: uzmi 4 stavke

    if (isNaN(n) || n <= 0) {
        return new Response(JSON.stringify({ message: "Invalid 'n' parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        // Pronađi najnovijih `n` oglasa po ID-u
        const latestItems = await prisma.item.findMany({
            orderBy: {
                id: "desc",
            },
            take: n,
            include: {
                condition: true, // Ako želiš dodatne detalje, prilagodi prema potrebi
                belongsto: true,
            },
        });

        return new Response(JSON.stringify(latestItems), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching latest items:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error", status: 500 }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
