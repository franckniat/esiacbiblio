import {Document, Article} from "@prisma/client";

export const addDocumentPerMonth = (documents: Document[]): { "Nombre de documents": number; mois: string }[] => {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept", "Octobre", "Novembre", "Décembre"];

    const docsByMonth: { [key: string]: number } = monthNames.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
    }, {} as { [key: string]: number });

    // Compter les événements par mois
    documents.forEach(document => {
        const monthIndex = document.createdAt.getMonth(); // Obtient l'index du mois (0-11)
        const monthName = monthNames[monthIndex];
        docsByMonth[monthName]++;
    });

    const transformedData = Object.keys(docsByMonth).map(month => ({
        mois: month,
        'Nombre de documents': docsByMonth[month]
    }));

    return transformedData;
}

export const addArticlePerMonth = (articles: Article[]): { "Nombre d'articles": number; mois: string }[] => {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept", "Octobre", "Novembre", "Décembre"];

    const articlesByMonth: { [key: string]: number } = monthNames.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
    }, {} as { [key: string]: number });

    articles.forEach(article => {
        const monthIndex = article.createdAt.getMonth();
        const monthName = monthNames[monthIndex];
        articlesByMonth[monthName]++;
    });

    const transformedData = Object.keys(articlesByMonth).map(month => ({
        mois: month,
        'Nombre d\'articles': articlesByMonth[month]
    }));

    return transformedData;
}

