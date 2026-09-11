import { getCurrentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";
import {
	BookOpen,
	GraduationCap,
	Sparkles,
	Users,
	FileText,
	Download,
	Heart,
	ArrowRight,
	Globe,
	Github,
	CheckCircle2,
	Code2,
	Library,
	ShieldCheck,
	Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
	const user = await getCurrentUser();
	const [docCount, userCount, articleCount, recentDocs] = await Promise.all([
		db.document.count().catch(() => 140),
		db.user.count().catch(() => 210),
		db.article.count().catch(() => 45),
		db.document
			.findMany({
				where: { isVisible: true },
				take: 4,
				orderBy: { createdAt: "desc" },
				include: { user: true, likes: true },
			})
			.catch(() => []),
	]);

	const popularFilters = [
		{ label: "Génie Logiciel", query: "Génie Logiciel" },
		{ label: "Réseaux & Télécoms", query: "Réseaux" },
		{ label: "Management", query: "Management" },
		{ label: "Systèmes Industriels", query: "Industriel" },
		{ label: "Annales d'examens", query: "Examen" },
	];

	return (
		<main className="min-h-screen">
			{/* HERO SECTION */}
			<section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/40">
				{/* Background Glows (Authentic ESIAC branding colors: Emerald + Red-500) */}
				<div
					className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-primary/20 via-red-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full"
					aria-hidden="true"
				/>
				<div
					className="absolute top-1/2 -right-20 w-[350px] h-[350px] bg-primary/10 blur-3xl -z-10 pointer-events-none rounded-full"
					aria-hidden="true"
				/>

				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
						{/* Top Sponsor / Community Pill */}
						<div className="mb-6 inline-flex items-center gap-2 p-1 pr-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-xs sm:text-sm transition-all">
							<span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold text-xs flex items-center gap-1">
								<Sparkles className="w-3.5 h-3.5" /> ESIAC-BIBLIO
							</span>
							<span className="text-muted-foreground hidden sm:inline">
								Bibliothèque collaborative d&apos;Afrique Centrale
							</span>
							<Link
								href="https://thanks.dev/u/gh/franckniat"
								target="_blank"
								className="text-primary font-medium hover:underline inline-flex items-center gap-1"
							>
								Soutenir <ArrowRight className="w-3 h-3" />
							</Link>
						</div>

						{/* Main Heading */}
						<h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-4xl">
							La bibliothèque numérique{" "}
							<span className="bg-gradient-to-r from-red-500 via-primary to-neutral-600 dark:from-red-500 dark:via-primary dark:to-neutral-300 bg-clip-text text-transparent">
								des étudiants de l&apos;ESIAC.
							</span>
						</h1>

						{/* Subtitle */}
						<p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
							Centralisez, consultez et partagez vos cours, fiches de révision,
							annales d&apos;examens et mémoires de fin d&apos;études en accès libre et
							illimité.
						</p>

						{/* Integrated Search Bar */}
						<div className="w-full mt-8 sm:mt-10">
							<HeroSearch />
						</div>

						{/* Quick Filter Tags */}
						<div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
							<span className="font-medium text-foreground/70">Sujets populaires :</span>
							{popularFilters.map((filter, index) => (
								<Link
									key={index}
									href={`/documents?title=${encodeURIComponent(filter.query)}`}
									className="px-3 py-1 rounded-full bg-muted/60 hover:bg-primary/15 hover:text-primary transition-colors border border-border/60 text-xs font-medium"
								>
									{filter.label}
								</Link>
							))}
						</div>

						{/* Call to Actions */}
						<div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
							<Link href="/documents" className="w-full sm:w-auto">
								<Button
									variant="success"
									size="lg"
									className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/20 gap-2"
								>
									<BookOpen className="w-5 h-5" />
									Explorer les documents
								</Button>
							</Link>
							<Link
								href={user ? "/dashboard" : "/auth/login"}
								className="w-full sm:w-auto"
							>
								<Button
									variant="secondary"
									size="lg"
									className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl hover:bg-muted/80 border border-border/80 gap-2"
								>
									{user ? (
										<>
											Tableau de bord
											<ArrowRight className="w-4 h-4" />
										</>
									) : (
										<>
											Rejoindre la communauté
											<ArrowRight className="w-4 h-4" />
										</>
									)}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* METRICS & STATS BANNER */}
			<section className="py-12 border-b border-border/40 bg-foreground/[0.01]">
				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
						<div className="flex flex-col items-center sm:items-start p-4 rounded-xl border border-border/50 bg-card/50">
							<div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-1">
								<FileText className="w-4 h-4" /> Documents indexés
							</div>
							<span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
								{docCount}+
							</span>
							<p className="text-xs text-muted-foreground mt-1">
								Cours, TD, examens &amp; fiches
							</p>
						</div>

						<div className="flex flex-col items-center sm:items-start p-4 rounded-xl border border-border/50 bg-card/50">
							<div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-1">
								<Users className="w-4 h-4" /> Étudiants inscrits
							</div>
							<span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
								{userCount}+
							</span>
							<p className="text-xs text-muted-foreground mt-1">
								Membres actifs d&apos;ESIAC
							</p>
						</div>

						<div className="flex flex-col items-center sm:items-start p-4 rounded-xl border border-border/50 bg-card/50">
							<div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-1">
								<GraduationCap className="w-4 h-4" /> Articles &amp; Guides
							</div>
							<span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
								{articleCount}+
							</span>
							<p className="text-xs text-muted-foreground mt-1">
								Méthodologies &amp; synthèses
							</p>
						</div>

						<div className="flex flex-col items-center sm:items-start p-4 rounded-xl border border-border/50 bg-card/50">
							<div className="flex items-center gap-2 text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-1">
								<ShieldCheck className="w-4 h-4" /> Accès libre
							</div>
							<span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
								100%
							</span>
							<p className="text-xs text-muted-foreground mt-1">
								Gratuit pour tous les étudiants
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* PILLARS & FEATURES SECTION */}
			<section className="py-20 md:py-28 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto sm:text-center mb-14">
					<h2 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
						Ressources académiques
					</h2>
					<p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						Tout ce dont vous avez besoin pour vos études à l&apos;ESIAC
					</p>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground">
						Une plateforme conçue pour vous faire gagner du temps lors des révisions et des examens.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
					<div className="p-8 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all shadow-xs flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-6">
								<BookOpen className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
								Annales &amp; Supports de cours
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Accédez rapidement aux examens des sessions antérieures, devoirs surveillés et fiches de révision partagés par vos camarades et enseignants.
							</p>
						</div>
						<div className="pt-6 mt-6 border-t border-border/50">
							<Link
								href="/documents"
								className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
							>
								Consulter le catalogue <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>

					<div className="p-8 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all shadow-xs flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-6">
								<FileText className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
								Articles &amp; Retours d&apos;expérience
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Consultez des guides pratiques sur les technologies émergentes, la méthodologie de soutenance de stage et les conseils de carrière pour ingénieurs.
							</p>
						</div>
						<div className="pt-6 mt-6 border-t border-border/50">
							<Link
								href="/articles"
								className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
							>
								Lire les publications <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>

					<div className="p-8 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all shadow-xs flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-6">
								<Sparkles className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
								Tuteur IA Académique
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Un assistant intelligent intégré, disponible sans connexion obligatoire, entraîné pour répondre strictement dans le cadre de vos cours et questions universitaires.
							</p>
						</div>
						<div className="pt-6 mt-6 border-t border-border/50">
							<span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5">
								<CheckCircle2 className="w-4 h-4" /> Disponible en bas d&apos;écran
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* RECENT ACADEMIC DOCUMENTS PREVIEW */}
			{recentDocs && recentDocs.length > 0 && (
				<section className="py-16 bg-muted/20 border-y border-border/50">
					<div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
							<div>
								<h2 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-1">
									Nouveautés
								</h2>
								<p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
									Derniers documents partagés
								</p>
							</div>
							<Link
								href="/documents"
								className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
							>
								Voir toute la bibliothèque <ArrowRight className="w-4 h-4" />
							</Link>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
							{recentDocs.map((doc) => (
								<div
									key={doc.id}
									className="p-5 rounded-xl bg-card border border-border/80 hover:border-primary/50 transition-all flex flex-col justify-between"
								>
									<div>
										<div className="flex items-center justify-between gap-2 mb-2">
											<span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary line-clamp-1">
												{doc.sector}
											</span>
											<span className="text-[11px] text-muted-foreground">
												{new Date(doc.createdAt).toLocaleDateString("fr-FR", {
													month: "short",
													year: "numeric",
												})}
											</span>
										</div>
										<h4 className="font-bold text-base text-foreground line-clamp-2 mt-2">
											{doc.title}
										</h4>
										<p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
											{doc.description}
										</p>
									</div>

									<div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
										<span className="truncate max-w-[120px]">
											Par {doc.user?.name || "Étudiant"}
										</span>
										<div className="flex items-center gap-1 text-primary font-medium">
											<Heart className="w-3.5 h-3.5" />
											{doc.likes?.length || 0}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* COLLABORATION & STATS SECTION (Signature "Travaillons ensemble" with smooth backdrop glow) */}
			<section className="relative py-20 md:py-28 overflow-hidden">
				<div
					className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#ff466e]/20 via-primary/20 to-transparent blur-3xl -z-10 pointer-events-none rounded-full"
					aria-hidden="true"
				/>

				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
							Travaillons ensemble pour l&apos;émulation de notre école.
						</h2>
						<p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground leading-relaxed">
							Chaque document déposé, chaque annale partagée fait gagner un temps précieux à un étudiant de l&apos;ESIAC. Créez votre compte pour contribuer au savoir collectif.
						</p>

						<div className="mt-8 flex flex-wrap gap-4">
							<Link href="/auth/register">
								<Button
									variant="success"
									size="lg"
									className="px-6 py-6 rounded-xl font-semibold shadow-md shadow-emerald-500/20"
								>
									Créer un compte étudiant
								</Button>
							</Link>
							<Link href="/about">
								<Button
									variant="secondary"
									size="lg"
									className="px-6 py-6 rounded-xl font-semibold border border-border/70"
								>
									En savoir plus sur le projet
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* FOUNDER & CONTRIBUTOR SPOTLIGHT */}
			<section className="py-16 md:py-20 border-t border-border/50 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="p-8 sm:p-10 rounded-2xl bg-card border border-border/80 shadow-xs">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-8">
						<a
							href="https://franckniat.me"
							target="_blank"
							rel="noopener noreferrer"
							className="group shrink-0 relative"
						>
							<Image
								src="/images/profile_master.jpg"
								title="Franck NIAT - Software Engineer"
								alt="Franck NIAT"
								width={140}
								height={140}
								className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-2 border-primary group-hover:border-red-500 transition-colors shadow-lg"
							/>
							<div className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-1.5 rounded-full shadow-md">
								<Code2 className="w-4 h-4" />
							</div>
						</a>

						<div className="flex-1 text-center md:text-left space-y-3">
							<div className="flex flex-col sm:flex-row items-center gap-3">
								<h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
									Franck NIAT
								</h3>
								<span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
									Software Engineer
								</span>
							</div>

							<p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
								Initiateur et développeur principal de la plateforme collaborative <strong>ESIAC-BIBLIO</strong>. Ce projet a été pensé et conçu pour favoriser l&apos;entraide, la diffusion du savoir et l&apos;excellence académique au sein de l&apos;École Supérieure d&apos;Ingénierie et de Management d&apos;Afrique Centrale.
							</p>

							<div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
								<a
									href="https://franckniat.me"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
								>
									<Globe className="w-4 h-4" /> https://franckniat.me
								</a>
								<a
									href="https://github.com/franckniat"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
								>
									<Github className="w-4 h-4" /> GitHub
								</a>
								<a
									href="https://thanks.dev/u/gh/franckniat"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-amber-500 hover:underline"
								>
									⚡️ Sponsoriser
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
