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

const tags = [
    {
        label: "Informatique",
        value: "Informatique",
    },
    {
        label: "Electronique",
        value: "Electronique",
    },
    {
        label: "Mécanique",
        value: "Mécanique",
    },
    {
        label: "Génie civil",
        value: "Génie civil",
    },
    {
        label: "Chimie",
        value: "Chimie",
    },
    {
        label: "Mathématiques",
        value: "Mathématiques",
    },
    {
        label: "Physique",
        value: "Physique",
    },
    {
        label: "Biologie",
        value: "Biologie",
    },
    {
        label: "Génie des procédés",
        value: "Génie des procédés",
    },
    {
        label: "Génie industriel",
        value: "Génie industriel",
    },
    {
        label: "Génie mécanique",
        value: "Génie mécanique",
    },
    {
        label: "Génie électrique",
        value: "Génie électrique",
    },
    {
        label: "Génie logiciel",
        value: "Génie logiciel",
    },
    {
        label: "Génie chimique",
        value: "Génie chimique",
    },
    {
        label: "Génie des télécommunications",
        value: "Génie des télécommunications",
    },
    {
        label: "Génie des mines",
        value: "Génie des mines",
    },
]

async function main() {
    const tag = await db.tag.createMany({
        data: tags
    })
}

/*async function main() {
    const category = await db.category.createMany({
        data: categories
    })
    const sector = await db.sector.createMany({
        data: sectors
    })
}*/

/*async function main() {
    const documents = Array.from({ length: 12 }, (_, i) => ({
        title: `Document ${i + 1}`,
        description: `Content for document ${i + 1}`,
        userId: "cm68cna5r0000zxeq9stph0ig", // Assuming you have a user with ID 1
        category: categories[i % categories.length].value,
        sector: sectors[i % sectors.length].value,
        fileURL: "https://clg-reeberg-neron.eta.ac-guyane.fr/IMG/pdf/chapitre_3_la_matiere_livret_.pdf"
    }));

    await db.document.createMany({
        data: documents,
    });

    console.log('Seeded 12 documents');
}*/

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })