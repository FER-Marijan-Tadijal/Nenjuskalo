import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function dostuff() {
    var fs = require('fs')
    var data = fs.readFileSync("C:\\FERC\\ProR\\Nenjuskalo\\arsenal.jpg");

    await prisma.picture.create({
        data: {
            itemid: 30,
            index: 0,
            picdata: data
        }
    })
}

async function giveback() {
    const data = await prisma.picture.findFirst({
        where: {
            index: 0,
        }
    })

    var fs = require('fs')
    fs.writeFile("C:\\FERC\\ProR\\Nenjuskalo\\fella2.png", data?.picdata, {}, () => {})
}

dostuff();
//giveback();