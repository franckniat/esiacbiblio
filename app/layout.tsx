import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const spaceGrotesk = localFont({
	src: "./fonts/SpaceGrotesk.ttf",
	variable: "--font-space-grotesk",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "ESIAC BIBLIO",
	description: "Application de la communauté des étudiants de l'ESIAC.",
	applicationName: "ESIAC-BIBLIO",
	keywords: [
		"Etudiants camerounais",
		"ESIAC",
		"BIBLIO",
		"ESIAC-BIBLIO",
		"Ecole Supérieure d'ingénierie et de management d'Afrique Centrale",
	],
	creator: "Franck NIAT",
	authors: [
		{
			name: "Franck NIAT",
			url: "https://fndev.vercel.app",
		},
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="fr">
				<body className={`${spaceGrotesk.className} antialiased`} suppressHydrationWarning>
					<Providers>{children}</Providers>
				</body>
			</html>
		</SessionProvider>
	);
}
