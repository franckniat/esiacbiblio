/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { PrismaClient } from '@prisma/client';

const db = globalThis.prisma || new PrismaClient();

const categories = [
    {
        label: "Rapport",
        value: "Rapport",
    },
    {
        label: "Mémoire",
        value: "Mémoire",
    },
    {
        label: "Cours",
        value: "Cours",
    },
    {
        label: "Travaux dirigés",
        value: "TD",
    },
    {
        label: "Examen",
        value: "Examen",
    },
    {
        label: "Recherche",
        value: "Recherche",
    }
]

const sectors = [
    {
        label: "Génie logiciel",
        value: "Génie logiciel",
        code: "GL"
    },
    {
        label: "Génie électrique",
        value: "Génie électrique",
        code: "GEL"
    },
    {
        label: "Génie mécanique",
        value: "Génie mécanique",
        code: "GMP"
    },
    {
        label: "Génie civil",
        value: "Génie civil",
        code: "GC"
    },
    {
        label: "Génie chimique",
        value: "Génie chimique",
        code: "GCH"
    },
    {
        label: "Tronc commun",
        value: "Tronc commun",
        code: "TC"
    },
    {
        label: "QRSI",
        value: "QRSI",
        code: "QRSI"
    }
]

async function main() {
    const category = await db.category.createMany({
        data: categories
    })
    const sector = await db.sector.createMany({
        data: sectors
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })