import type { Metadata } from "next";
import { Inter, DM_Sans, Space_Grotesk } from "next/font/google";
import Providers from "@/providers";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESIAC-BIBLIO",
  description: "Application de la communauté des étudiants de l'ESIAC.",
  applicationName: "ESIAC-BIBLIO",
  keywords: ["Etudiants camerounais","ESIAC", "BIBLIO", "ESIAC-BIBLIO","Ecole Supérieure d'ingénierie et de management d'Afrique Centrale"],
  creator: "Franck NIAT",
  authors: [{
    name: "Franck NIAT",
    url: "https://franckinato.vercel.app",
  }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="fr">
        <body className={`${space_grotesk.className} min-h-screen antialiased bg-white dark:bg-slate-950`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
