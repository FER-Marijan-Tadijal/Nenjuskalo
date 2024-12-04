import { Container, Typography, Box } from "@mui/material";
import Component from "@/app/Component";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ bgcolor: "black", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Dobrodosli na nasu predivnu Nenjuskalo aplikaciju
        </Typography>
        <Typography variant="body1">
          Pocetak developanja je u <code>src/app/page.tsx</code> datoteci. Sretno!
        </Typography>
        <Component />
      </Box>
    </Container>
  );
}
