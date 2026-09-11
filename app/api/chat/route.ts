import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

export const maxDuration = 30;

const ACADEMIC_SYSTEM_PROMPT = `Tu es BiblioBot, l'assistant académique et pédagogique officiel de la bibliothèque numérique ESIAC-BIBLIO (École Supérieure d'Ingénierie et de Management d'Afrique Centrale).

MISSION ET RÈGLES STRICTES :
1. Tu réponds EXCLUSIVEMENT dans le cadre éducatif, universitaire, scientifique et méthodologique.
2. Domaines d'expertise :
   - Génie Logiciel, Algorithmique, Programmation, Bases de données, Architecture logicielle
   - Réseaux, Systèmes & Télécommunications, Cybersécurité
   - Électronique et Systèmes embarqués
   - Management, Gestion de projets, Économie d'entreprise, Marketing
   - Méthodologie académique : rédaction de rapports de stage, mémoires de BTS, Licence et Master, préparation d'examens et de soutenances.
3. RESTRICTION STRICTE : Si l'utilisateur pose une question hors du cadre académique ou universitaire (divertissement, sujets sans rapport avec les études, requêtes non éducatives), refuse poliment en rappelant : "Je suis un assistant dédié exclusivement au soutien pédagogique et universitaire des étudiants d'ESIAC-BIBLIO. Comment puis-je vous aider dans vos cours ou projets académiques ?"
4. Sois pédagogue, encourageant, précis et structure tes réponses avec des puces ou du code clair si nécessaire.`;

const GUEST_MAX_MESSAGES = 5;

export async function POST(req: Request) {
    try {
        const reqHeaders = await headers();
        const session = await auth.api.getSession({
            headers: reqHeaders,
        });
        const isLoggedIn = !!session?.user;

        const cookieStore = await cookies();
        let guestCount = 0;

        if (!isLoggedIn) {
            const guestCookie = cookieStore.get("esiac_guest_chat_count");
            guestCount = guestCookie ? parseInt(guestCookie.value, 10) || 0 : 0;

            if (guestCount >= GUEST_MAX_MESSAGES) {
                return NextResponse.json(
                    {
                        error: "Quota invité atteint. Vous avez utilisé vos 5 messages gratuits. Connectez-vous ou créez un compte gratuit pour continuer en illimité !",
                        limitReached: true,
                    },
                    { status: 429 }
                );
            }
        }

        const { messages } = await req.json();

        const result = streamText({
            model: google("gemini-1.5-flash"),
            system: ACADEMIC_SYSTEM_PROMPT,
            messages,
        });

        const response = result.toDataStreamResponse();

        if (!isLoggedIn) {
            response.headers.set(
                "Set-Cookie",
                `esiac_guest_chat_count=${guestCount + 1}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`
            );
        }

        return response;
    } catch (error: any) {
        console.error("Erreur API Chat:", error);
        return NextResponse.json(
            { error: error?.message || "Une erreur est survenue avec le service d'IA." },
            { status: 500 }
        );
    }
}