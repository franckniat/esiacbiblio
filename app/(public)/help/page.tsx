import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleHelp, LifeBuoy, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
	title: "Centre d'aide - ESIAC BIBLIO",
	description:
		"Questions fréquentes sur l'utilisation de la bibliothèque numérique ESIAC-BIBLIO.",
};

const faq = [
	{
		question: "Faut-il un compte pour consulter les documents ?",
		answer:
			"Non. La consultation et le téléchargement des documents publiés sont libres et gratuits. Un compte n'est nécessaire que pour publier vos propres ressources, aimer un document ou commenter un article.",
	},
	{
		question: "Comment publier un document ?",
		answer:
			"Connectez-vous, puis rendez-vous dans votre tableau de bord et cliquez sur « Nouveau document ». Renseignez le titre, la description, la filière et la catégorie, puis joignez votre fichier PDF. Le document apparaît dans la bibliothèque une fois publié.",
	},
	{
		question: "Quels types de fichiers sont acceptés ?",
		answer:
			"Les documents sont attendus au format PDF afin de garantir la même lecture sur tous les appareils, ainsi qu'un aperçu directement dans le navigateur.",
	},
	{
		question: "Pourquoi mon document n'apparaît-il pas dans la bibliothèque ?",
		answer:
			"Un document reste privé tant qu'il n'est pas rendu visible. Vérifiez sa visibilité depuis votre tableau de bord. Un document peut également être masqué par un administrateur s'il ne respecte pas les règles de partage de l'école.",
	},
	{
		question: "Comment rechercher une annale précise ?",
		answer:
			"Utilisez la barre de recherche de la page Documents, puis affinez avec les filtres « catégorie » et « filière ». La recherche porte sur le titre du document.",
	},
	{
		question: "À quoi sert l'assistant IA ?",
		answer:
			"L'assistant intégré (bulle en bas à droite) répond aux questions d'ordre académique : méthodologie, explication de notions, orientation dans la plateforme. Il reste cantonné au cadre scolaire et universitaire.",
	},
	{
		question: "Que sont les points d'expérience ?",
		answer:
			"Ils récompensent vos contributions à la plateforme : documents partagés, articles publiés et interactions avec la communauté. Ils déterminent le titre affiché sur votre profil public.",
	},
	{
		question: "Comment signaler un contenu ou demander un retrait ?",
		answer:
			"Contactez l'équipe depuis la page Support. Toute demande de retrait de contenu protégé par le droit d'auteur est traitée en priorité.",
	},
];

export default function HelpPage() {
	return (
		<main className="max-w-[1340px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
			<CustomBreadcrumb
				path={[
					{ name: "Accueil", href: "/" },
					{ name: "Centre d'aide", href: "/help" },
				]}
			/>

			<section className="pt-6 pb-10 max-w-3xl">
				<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
					<CircleHelp className="w-3.5 h-3.5" /> Centre d&apos;aide
				</div>
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
					Questions fréquentes
				</h1>
				<p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
					L&apos;essentiel pour consulter, publier et gérer vos ressources sur
					ESIAC-BIBLIO. Si votre question ne figure pas ici, l&apos;équipe reste
					joignable.
				</p>
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
				<section className="lg:col-span-2">
					<Accordion type="single" collapsible className="w-full">
						{faq.map((item, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className="text-left text-base font-semibold hover:no-underline hover:text-primary">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="text-sm text-muted-foreground leading-relaxed">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>

				<aside className="space-y-4">
					<div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-3">
						<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<LifeBuoy className="w-5 h-5" />
						</div>
						<h2 className="font-bold">Besoin d&apos;aide supplémentaire ?</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Un problème technique, une demande de retrait ou une suggestion :
							écrivez-nous depuis la page support.
						</p>
						<Link href="/support" className="block">
							<Button variant="success" className="w-full font-semibold">
								Contacter le support
							</Button>
						</Link>
					</div>

					<div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-3">
						<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<MessageCircle className="w-5 h-5" />
						</div>
						<h2 className="font-bold">Assistant IA</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Pour une question académique ou une aide à la navigation, ouvrez la
							bulle de discussion en bas à droite de l&apos;écran.
						</p>
					</div>
				</aside>
			</div>
		</main>
	);
}
