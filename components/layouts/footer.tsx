import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const resourceLinks = [
	{ label: "Documents", href: "/documents" },
	{ label: "Articles", href: "/articles" },
];

const infoLinks = [
	{ label: "À propos", href: "/about" },
	{ label: "Centre d'aide", href: "/help" },
	{ label: "Support & Contact", href: "/support" },
];

const communityLinks = [
	{ label: "Créer un compte", href: "/auth/register" },
	{ label: "Se connecter", href: "/auth/login" },
	{ label: "Publier un document", href: "/dashboard/documents/new" },
];

export default function Footer() {
	return (
		<footer className="border-t border-border/60 bg-muted/30">
			<div className="max-w-[1340px] mx-auto px-4 sm:px-6 pt-12 pb-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-border/60">
					{/* Brand */}
					<div className="col-span-2 md:col-span-1 max-w-xs">
						<Image
							height={80}
							width={80}
							className="w-14 h-14 object-contain mb-4"
							src="/images/logo_esiac.png"
							alt="Logo ESIAC"
						/>
						<p className="font-bold uppercase tracking-wide text-xs leading-snug">
							École Supérieure d&apos;Ingénierie et de Management d&apos;Afrique
							Centrale
						</p>
						<p className="text-xs text-muted-foreground mt-2.5 leading-relaxed">
							Plateforme collaborative d&apos;apprentissage et de partage de
							ressources pour la communauté étudiante.
						</p>
					</div>

					{/* Ressources */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Ressources
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-muted-foreground">
							{resourceLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="hover:text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
							<li>
								<span className="flex items-center gap-2 cursor-default">
									Discussions
									<Badge variant="secondary" className="text-[10px] px-1.5 py-0">
										Bientôt
									</Badge>
								</span>
							</li>
						</ul>
					</div>

					{/* Informations */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Informations
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-muted-foreground">
							{infoLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="hover:text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
							<li>
								<a
									href="https://thanks.dev/u/gh/franckniat"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-brand transition-colors"
								>
									Sponsoriser ⚡️
								</a>
							</li>
						</ul>
					</div>

					{/* Communauté */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Communauté
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-muted-foreground">
							{communityLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="hover:text-primary transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted-foreground">
					<p className="text-center sm:text-left">
						© {new Date().getFullYear()} ESIAC-BIBLIO — Développé par{" "}
						<a
							className="text-primary font-semibold hover:underline"
							target="_blank"
							rel="noopener noreferrer"
							href="https://franckniat.me"
						>
							Franck NIAT
						</a>
					</p>

					<div className="flex items-center gap-1">
						<a
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub du projet"
							href="https://github.com/franckniat/esiacbiblio"
							className="p-2 rounded-md hover:bg-muted hover:text-foreground transition-colors"
						>
							<Github size={18} />
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Compte X / Twitter"
							href="https://twitter.com/manuel_niat"
							className="p-2 rounded-md hover:bg-muted hover:text-foreground transition-colors"
						>
							<Twitter size={18} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
