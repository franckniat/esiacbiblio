import { Metadata } from "next";

export const metadata: Metadata = {
	title: "ESIAC-BIBLIO",
	description: "Accéder à votre compte u créer en un.",
	applicationName: "ESIAC-BIBLIO",
	creator: "Franck NIAT",
	authors: [
		{
			name: "Franck NIAT",
			url: "https://franckinato.vercel.app",
		},
	],
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="flex items-center justify-center min-h-screen">
				{children}
			</div>
		</>
	);
}
