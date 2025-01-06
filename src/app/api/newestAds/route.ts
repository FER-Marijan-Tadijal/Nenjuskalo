import { prisma } from "@/prisma";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const nParam = url.searchParams.get("n");
    const n = nParam ? parseInt(nParam) : 10; // Default: uzmi 10 stavki

    if (isNaN(n) || n <= 0) {
        return new Response(JSON.stringify({ message: "Invalid 'n' parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        // Prvo pronađi najnovijih `n` promena stanja
        const latestChanges = await prisma.itemchangestate.findMany({
            select: {
                itemid: true,
                changetime: true,
            },
            orderBy: {
                changetime: "desc",
            },
            take: n,
        });

        // Izvuci ID-eve stavki
        const itemIds = latestChanges.map((change) => change.itemid);

        // Pronađi stavke koristeći ID-eve
        const latestItems = await prisma.item.findMany({
            where: {
                id: {
                    in: itemIds,
                },
            },
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
