import { getCurrentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";
import DocumentCard from "@/components/document/index";
import ArticleCard from "@/components/article/index";
import { ArrowRight, ChevronRight, Github, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
	const user = await getCurrentUser();

	const [
		docCount,
		userCount,
		articleCount,
		latestDocuments,
		latestArticles,
		quickCategories,
	] = await Promise.all([
			db.document.count({ where: { isVisible: true } }).catch(() => 0),
			db.user.count().catch(() => 0),
			db.article.count({ where: { isVisible: true } }).catch(() => 0),
			db.document
				.findMany({
					where: { isVisible: true },
					orderBy: { createdAt: "desc" },
					take: 4,
					include: { user: true, likes: true },
				})
				.catch(() => []),
			db.article
				.findMany({
					where: { isVisible: true },
					orderBy: { createdAt: "desc" },
					take: 3,
					include: { user: true, likes: true, tags: true, comments: true },
				})
				.catch(() => []),
			db.category.findMany({ take: 5 }).catch(() => []),
		]);

	const stats = [
		{ label: "Documents publiés", value: docCount },
		{ label: "Membres inscrits", value: userCount },
		{ label: "Articles & tutoriels", value: articleCount },
	];

	return (
		<main>
			{/*
			 * HERO
			 * -mt-16 pt-16 : la barre de navigation est sticky, elle occupe donc
			 * 64px dans le flux. Sans cela le hero démarre sous elle et laisse
			 * apparaître le fond du body. La marge négative fait remonter la
			 * section jusqu'en haut de page, le padding replace son contenu sous
			 * la barre — hauteur totale inchangée pour la suite de la page.
			 */}
			<section className="hero -mt-16 pt-16 border-b border-border/60">
				{/* Halos de fond, derrière la grille (z-index -1 du pseudo-élément). */}
				<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
					<div className="hero-glow absolute left-1/2 -top-32 sm:-top-40 h-72 w-[26rem] sm:h-[30rem] sm:w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 dark:bg-primary/20 sm:dark:bg-primary/25 blur-[110px] sm:blur-[130px]" />
					<div className="hero-glow hero-glow--delayed hidden sm:block absolute left-[8%] top-[45%] h-72 w-72 rounded-full bg-brand/6 dark:bg-brand/15 blur-[110px]" />
					<div className="hero-glow hero-glow--delayed hidden sm:block absolute right-[6%] top-[18%] h-80 w-80 rounded-full bg-primary/8 dark:bg-primary/20 blur-[120px]" />
				</div>

				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center">
					<Link
						href="https://thanks.dev/u/gh/franckniat"
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-2 p-1 pr-3 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs sm:text-sm shadow-xs hover:bg-card hover:border-brand/30 transition-colors animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700"
					>
						<span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-semibold uppercase tracking-wide text-[11px]">
							Open source
						</span>
						<span className="text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
							<span className="hidden sm:inline">
								Soutenez ESIAC-BIBLIO en nous sponsorisant
							</span>
							<span className="sm:hidden">Soutenez le projet</span>
						</span>
						<ChevronRight
							size={14}
							strokeWidth={2.5}
							className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
						/>
					</Link>

					<h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-100">
						ESIAC<span className="text-brand">-</span>BIBLIO
					</h1>

					<p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200">
						La bibliothèque numérique de l&apos;École Supérieure d&apos;Ingénierie
						et de Management d&apos;Afrique Centrale. Cours, annales, mémoires et
						articles partagés par la communauté étudiante.
					</p>

					<div className="mt-9 w-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300">
						<HeroSearch />
					</div>

					{quickCategories.length > 0 && (
						<div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-[400ms]">
							<span className="text-muted-foreground mr-1">Accès rapide :</span>
							{quickCategories.map((category) => (
								<Link
									key={category.id}
									href={`/documents?category=${encodeURIComponent(category.value)}`}
									className="px-3 py-1 rounded-full border border-border bg-card/70 backdrop-blur-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
								>
									{category.label}
								</Link>
							))}
						</div>
					)}

					<div className="mt-7 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-500">
						<Link
							href={user ? "/dashboard" : "/auth/register"}
							className="w-full sm:w-auto"
						>
							<Button
								variant="success"
								size="lg"
								className="w-full sm:w-auto font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
							>
								{user ? "Accéder au tableau de bord" : "Rejoindre la communauté"}
							</Button>
						</Link>
						<Link href="/documents" className="w-full sm:w-auto">
							<Button
								variant="outline"
								size="lg"
								className="w-full sm:w-auto font-semibold bg-card/60 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
							>
								Parcourir la bibliothèque
							</Button>
						</Link>
					</div>

					<div className="mt-12 flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground animate-in fade-in fill-mode-both duration-1000 delay-700">
						<Image
							src="/images/logo_esiac.png"
							alt=""
							width={56}
							height={56}
							className="w-7 h-7 object-contain"
						/>
						Conçu par les étudiants, pour les étudiants.
					</div>
				</div>
			</section>

			{/* --------------------------------------------------------------- STATS */}
			<section className="border-b border-border/60 bg-muted/30">
				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`border-l-2 pl-5 ${
									// Vert / rouge / vert : le duo du logo ESIAC, en filigrane.
									index === 1 ? "border-brand" : "border-primary"
								}`}
							>
								<p className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
									{stat.value}
								</p>
								<p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --------------------------------------------------- DERNIERS DOCUMENTS */}
			{latestDocuments.length > 0 && (
				<section className="max-w-[1340px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
					<div className="flex flex-wrap items-end justify-between gap-4 mb-8">
						<div>
							<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
								Derniers documents
							</h2>
							<p className="text-sm text-muted-foreground mt-1.5">
								Les ressources les plus récemment partagées par la communauté.
							</p>
						</div>
						<Link
							href="/documents"
							className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
						>
							Tout voir <ArrowRight className="w-4 h-4" />
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{latestDocuments.map((document) => (
							<DocumentCard
								key={document.id}
								id={document.id}
								document={document}
							/>
						))}
					</div>
				</section>
			)}

			{/* ---------------------------------------------------- DERNIERS ARTICLES */}
			{latestArticles.length > 0 && (
				<section className="border-t border-border/60 bg-muted/30">
					<div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
						<div className="flex flex-wrap items-end justify-between gap-4 mb-8">
							<div>
								<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
									Articles &amp; méthodologies
								</h2>
								<p className="text-sm text-muted-foreground mt-1.5">
									Synthèses, tutoriels et retours d&apos;expérience rédigés par
									les étudiants.
								</p>
							</div>
							<Link
								href="/articles"
								className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
							>
								Tout voir <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{latestArticles.map((article) => (
								<ArticleCard key={article.id} article={article} />
							))}
						</div>
					</div>
				</section>
			)}

			{/* ------------------------------------------------------------ CTA FINAL */}
			<section className="border-t border-border/60">
				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
					<div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
						<div className="max-w-2xl space-y-3">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
								<GraduationCap className="w-3.5 h-3.5" /> Travaillons ensemble
							</div>
							<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
								Partagez vos ressources avec l&apos;ESIAC
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Créez votre compte pour déposer vos cours, annales et fiches de
								révision, publier des articles et contribuer au partage de
								connaissances au sein de l&apos;école. L&apos;accès est libre et
								gratuit.
							</p>
						</div>
						<div className="shrink-0">
							<Link href={user ? "/dashboard/documents/new" : "/auth/register"}>
								<Button
									variant="success"
									size="lg"
									className="font-semibold w-full md:w-auto"
								>
									{user ? "Publier un document" : "Créer un compte gratuit"}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* ------------------------------------------------------- CONTRIBUTEURS */}
			<section className="border-t border-border/60">
				<div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-12">
					<h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
						Contributeurs
					</h2>
					<div className="flex items-center gap-5">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://franckniat.me"
							className="group shrink-0"
						>
							<Image
								src="/images/profile_master.jpg"
								title="Franck NIAT - Software Engineer"
								alt="Franck NIAT"
								width={96}
								height={96}
								className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-border group-hover:border-primary transition-colors"
							/>
						</a>
						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-2.5">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://franckniat.me"
									className="text-lg font-bold hover:text-primary transition-colors"
								>
									Franck NIAT
								</a>
								<span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
									Software Engineer
								</span>
							</div>
							<p className="text-sm text-muted-foreground mt-1">
								Initiateur et développeur de la plateforme ESIAC-BIBLIO.
							</p>
							<div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://franckniat.me"
									className="text-primary hover:underline flex items-center gap-1.5"
								>
									<Globe size={14} /> franckniat.me
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/franckniat"
									className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
								>
									<Github size={14} /> GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
