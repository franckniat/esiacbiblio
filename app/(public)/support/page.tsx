import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Bug,
	Github,
	Globe,
	LifeBuoy,
	MessageCircle,
	ShieldAlert,
	Twitter,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Support & Contact - ESIAC BIBLIO",
	description:
		"Signalez un problème, demandez le retrait d'un contenu ou proposez une amélioration à l'équipe ESIAC-BIBLIO.",
};

const channels = [
	{
		icon: Bug,
		title: "Signaler un bug",
		description:
			"Une page qui ne charge pas, un document illisible, un comportement inattendu : ouvrez un ticket sur le dépôt du projet.",
		action: "Ouvrir un ticket",
		href: "https://github.com/franckniat/esiacbiblio/issues",
		external: true,
	},
	{
		icon: ShieldAlert,
		title: "Demande de retrait",
		description:
			"Un document vous appartient et ne devrait pas être publié ? Signalez-le, il sera retiré après vérification.",
		action: "Nous écrire sur X",
		href: "https://twitter.com/manuel_niat",
		external: true,
	},
	{
		icon: Globe,
		title: "Partenariats & suggestions",
		description:
			"Enseignant, responsable de filière ou association étudiante : contactez le mainteneur du projet directement.",
		action: "franckniat.me",
		href: "https://franckniat.me",
		external: true,
	},
];

export default function SupportPage() {
	return (
		<main className="max-w-[1340px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
			<CustomBreadcrumb
				path={[
					{ name: "Accueil", href: "/" },
					{ name: "Support", href: "/support" },
				]}
			/>

			<section className="pt-6 pb-10 max-w-3xl">
				<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
					<LifeBuoy className="w-3.5 h-3.5" /> Support &amp; Contact
				</div>
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
					Une question, un problème ?
				</h1>
				<p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
					ESIAC-BIBLIO est maintenu par des étudiants. Commencez par le centre
					d&apos;aide : la plupart des questions y trouvent une réponse
					immédiate. Sinon, choisissez le canal adapté ci-dessous.
				</p>
				<div className="mt-6 flex flex-col sm:flex-row gap-3">
					<Link href="/help">
						<Button variant="success" className="font-semibold w-full sm:w-auto">
							Consulter le centre d&apos;aide
						</Button>
					</Link>
					<Link href="/documents">
						<Button variant="outline" className="font-semibold w-full sm:w-auto">
							Retour à la bibliothèque
						</Button>
					</Link>
				</div>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
				{channels.map((channel) => (
					<div
						key={channel.title}
						className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-3 hover:border-primary/50 transition-colors"
					>
						<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<channel.icon className="w-5 h-5" />
						</div>
						<h2 className="font-bold">{channel.title}</h2>
						<p className="text-sm text-muted-foreground leading-relaxed grow">
							{channel.description}
						</p>
						<a
							href={channel.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
						>
							{channel.action} →
						</a>
					</div>
				))}
			</section>

			<section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div className="space-y-2 max-w-2xl">
					<h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
						Besoin d&apos;une réponse tout de suite ?
					</h2>
					<p className="text-sm text-muted-foreground leading-relaxed">
						L&apos;assistant IA de la plateforme, accessible via la bulle en bas à
						droite de l&apos;écran, répond aux questions académiques et vous
						oriente dans la bibliothèque à toute heure.
					</p>
				</div>
				<div className="flex items-center gap-2 shrink-0">
					<MessageCircle className="w-5 h-5 text-primary" />
					<span className="text-sm font-semibold">Assistant ESIAC-BIBLIO</span>
				</div>
			</section>

			<section className="flex flex-wrap items-center gap-4 pt-10 text-sm text-muted-foreground">
				<span className="font-medium text-foreground">Suivre le projet :</span>
				<a
					href="https://github.com/franckniat/esiacbiblio"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
				>
					<Github className="w-4 h-4" /> GitHub
				</a>
				<a
					href="https://twitter.com/manuel_niat"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
				>
					<Twitter className="w-4 h-4" /> X / Twitter
				</a>
			</section>
		</main>
	);
}
