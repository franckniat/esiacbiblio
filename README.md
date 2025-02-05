# ESIAC-BIBLIO

## Stack

 - [Next.js](https://nextjs.org/)
 - [Auth js](https://authjs.dev)
 - [Prisma ORM](https://www.prisma.io/)
 - [Tailwindcss](https://www.tailwindcss.com/)
 - [Shadcn UI](https://ui.shadcn.com)
 - [Firebase](https://firebase.google.com/)

## Getting Started

First, install the dependencies:

```bash
bun install
#or
npm install
#or
yarn install
#or
pnpm install
```
If you don't want to use bun, just delete the `bun.lock` file and the `node_modules` folder and run `npm install` or `yarn install` or `pnpm install` instead.

Then, you have to set up the database. This project uses [Prisma](https://www.prisma.io/) to interact with the database.
So create your Postgres database and set the connection string in the `.env` file. You can use the `.env.example` file as a template.

```bash
npx prisma generate
```
then run the migrations:
```bash
npx prisma migrate dev
```
and push the schema to the database:
```bash
npx prisma db push
```

Make sure that you have all the environment variables set up in the `.env` file.

Finally run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
