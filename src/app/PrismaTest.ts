import prisma from '@/lib/db';

async function main() {
  /* await prisma.item.create({
    data: {
      id: 11,
      title: "megatron",
      askingprice: 123122,
      siteuser_item_selleridTositeuser: {
        connect: {
          id: 1
        }
      },
      condition: {
        connect: {
          id: 3
        }
      }
    }
  }) */

  /* await prisma.belongsto.create({
    data:
    {
      categoryid: 4,
      itemid: 11
    }
  }) */

  /* await prisma.category.update({
    data: {
      name: "transformeri"
    },
    where: {
      id: 4
    }
  }) */

  console.log(await prisma.belongsto.findMany({
    select: {
      item: true
    },
    where: {
      categoryid: 4
    }
  }));
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })