Ovo je projekt za ProjektR - Nenjuskalo

## Getting Started

Napomena: "npm install" kako bi instalirao potrebne module.

Upali bazu podataka  

- Otvori pgadmin ili psql i stvori bazu podataka iz dump-a baze.
- stvorni novu praznu BP, pa desni klik, restore, "backup"
- upiši u terminal "npx prisma init" kako bi stvorio .env datoteku (ako se žali za folder prisma, obriši ga)
- upiši lokaciju lokalne baze podataka u stvorenu .env datoteku
- "npx prisma db pull"
- "npx prisma generate"
- "npx tsx src/app/PrismaTest.ts" kako bi testirao je li radi

Upali server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


Neki korisni linkovi, pogotovo MaterialUI (MUI) templates:
[https://mui.com/material-ui/getting-started/templates/](https://mui.com/material-ui/getting-started/templates/)




Additional info:

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
