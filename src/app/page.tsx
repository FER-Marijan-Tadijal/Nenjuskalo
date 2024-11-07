import prisma from "@/lib/db";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

export default async function Home() {

  const categories = await prisma.category.findMany();
  console.log(categories);
  return (
    <Container maxWidth="md" sx={{ bgcolor: "black", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Dobrodosli na nasu predivnu Nenjuskalo aplikaciju!!!
        </Typography>
        <Typography variant="body1">
          Pocetak developanja je u <code>src/app/page.tsx</code> datoteci. Sretno!
        </Typography>
        <ul>
          {categories.map((el) => (
            <li key={el.id} >
              <Link href={`/categories/${el.id}`}>{el.name}</Link></li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}
