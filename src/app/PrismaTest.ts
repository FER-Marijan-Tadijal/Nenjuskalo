import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /*await prisma.todoItem.create({
    data: {
      Name: 'Todo Item Name',
      Description: 'Put pg database data in .env'
    },
  })
  */
  const allUsers = await prisma.siteuser.findMany();
  console.log(allUsers);
  
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