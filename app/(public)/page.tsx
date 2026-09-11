import { getCurrentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/hero-search";
import { ChevronRight, Globe, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
	const user = await getCurrentUser();
	const [docCount, userCount, articleCount] = await Promise.all([
		db.document.count().catch(() => 500),
		db.user.count().catch(() => 210),
		db.article.count().catch(() => 50),
	]);

	return (
		<main className="max-w-[1340px] mx-auto px-4 sm:px-6">
			{/* 1. HERO SECTION - Expansive, Grand & Authentic to ESIAC-BIBLIO Identity */}
			<section
				className="hero flex justify-center flex-col min-h-[85vh] py-20 sm:py-28 lg:py-36 px-4"
				style={{
					backgroundSize: "1350px",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				{/* Sponsor Pill */}
				<section className="flex justify-center">
					<Link
						href="https://thanks.dev/u/gh/franckniat"
						target="_blank"
						className="group bg-foreground/5 inline-flex active:scale-95 transition-all items-center hover:bg-foreground/10 p-1 pr-3 rounded-full text-xs sm:text-sm border border-foreground/5 shadow-xs"
					>
						<div className="px-3 py-1 text-xs font-semibold leading-5 uppercase tracking-wide rounded-full bg-foreground/10 flex items-center gap-1.5">
							<span>⚡️</span> Sponsor
						</div>
						<div className="ml-3 hidden sm:block font-medium text-foreground/80 group-hover:text-foreground transition-colors">
							Soutenez C-GIT aujourd&#039;hui en nous sponsorisant.
						</div>
						<div className="ml-3 sm:hidden font-medium text-foreground/80 group-hover:text-foreground transition-colors">
							Soutenez C-GIT
						</div>
						<ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 ml-2 transition-transform text-foreground/60"/>
					</Link>
				</section>

				{/* Grand Main Heading */}
				<section className="mt-8 sm:mt-12 text-center max-w-5xl mx-auto">
					<h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter sm:leading-none bg-gradient-to-r from-red-500 via-primary to-neutral-600 dark:from-red-500 dark:via-primary dark:to-neutral-300 text-transparent bg-clip-text pr-1 inline-block select-none py-2">
						ESIAC-BIBLIO
					</h1>

					<p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-foreground/80 max-w-3xl mx-auto leading-relaxed">
						Bienvenue dans la bibliothèque numérique de l&#039;Ecole
						Supérieure d&#039;Ingénierie et de Management
						d&#039;Afrique Centrale.
					</p>

					{/* Seamless Integrated Search Bar */}
					<div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
						<HeroSearch />
					</div>

					{/* Hero Action Buttons */}
					<div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row md:gap-5 sm:justify-center items-center">
						<Link
							href={user ? "/dashboard" : "/auth/login"}
							className="w-full sm:w-auto"
						>
							<Button
								variant="success"
								size={"lg"}
								className="active:scale-95 transition font-semibold w-full sm:w-fit text-base px-8 py-6 rounded-xl shadow-lg shadow-emerald-500/20"
							>
								{user ? "Accéder au tableau de bord" : "Rejoindre la communauté"}
							</Button>
						</Link>
						<Link href="/documents" className="w-full sm:w-auto">
							<Button
								variant="secondary"
								size={"lg"}
								className="active:scale-95 transition font-semibold w-full sm:w-fit text-base px-8 py-6 rounded-xl hover:bg-muted/80 border border-border/60"
							>
								Visiter la bibliothèque
							</Button>
						</Link>
					</div>
				</section>
			</section>

			{/* Tagline Separator */}
			<section className="pt-16 md:pt-24 lg:pt-28 pb-8 border-b border-gray-300 dark:border-neutral-800 mx-2">
				<div className="text-center text-sm sm:text-base font-medium">
					<p className="text-foreground/60 tracking-wider">
						Conçu par les étudiants pour les étudiants.
					</p>
				</div>
			</section>

			{/* 2. "TRAVAILLONS ENSEMBLE" SECTION - Grand & Polygon Mesh Glow */}
			<section className="relative py-28 sm:py-40 pointer-events-auto overflow-hidden">
				<div
					className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl pointer-events-none"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[36rem] lg:w-[48rem] bg-gradient-to-tr from-[#ff466e] to-primary dark:opacity-30 opacity-40"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>
				<div
					className="hidden sm:absolute sm:top-1/3 sm:left-1/2 sm:ml-10 sm:block sm:transform-gpu sm:blur-3xl pointer-events-none"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[36rem] lg:w-[48rem] bg-gradient-to-tr from-[#ff466e] to-primary dark:opacity-30 opacity-40"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-3xl lg:mx-0">
						<h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl leading-tight">
							Travaillons ensemble
						</h2>
						<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-foreground/75 font-medium">
							Créez votre compte pour ainsi contribuer au
							bien-être et au partage de connaissances au sein
							d&#039;ESIAC.
						</p>
					</div>

					<div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
						<dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
							<div className="flex flex-col-reverse border-l-2 border-primary/40 pl-6 py-2">
								<dt className="text-base font-medium leading-7 text-muted-foreground mt-2">
									Documents enregistrés
								</dt>
								<dd className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
									{docCount}
								</dd>
							</div>
							<div className="flex flex-col-reverse border-l-2 border-primary/40 pl-6 py-2">
								<dt className="text-base font-medium leading-7 text-muted-foreground mt-2">
									Étudiants inscrits
								</dt>
								<dd className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
									{userCount}+
								</dd>
							</div>
							<div className="flex flex-col-reverse border-l-2 border-primary/40 pl-6 py-2">
								<dt className="text-base font-medium leading-7 text-muted-foreground mt-2">
									Articles &amp; tutoriels
								</dt>
								<dd className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
									{articleCount}
								</dd>
							</div>
							<div className="flex flex-col-reverse border-l-2 border-primary/40 pl-6 py-2">
								<dt className="text-base font-medium leading-7 text-muted-foreground mt-2">
									Accès aux données
								</dt>
								<dd className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
									Illimité et gratuit
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>

			{/* 3. CONTRIBUTOR & FOUNDER SECTION - Generous, Authentic & High Quality */}
			<section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border/60 max-w-[1340px] mx-auto">
				<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8">
					Contributeurs :
				</h2>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl bg-foreground/[0.02] border border-border hover:border-border/80 transition-all">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://franckniat.me"
						className="group shrink-0"
					>
						<Image
							src="/images/profile_master.jpg"
							title="Franck NIAT - Software Engineer"
							alt="IMAGE CONTRIBUTEUR : Franck NIAT"
							width={300}
							height={300}
							className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-2 border-foreground/40 group-hover:border-red-500 transition-colors shadow-md"
						/>
					</a>

					<div className="space-y-2 flex-1">
						<div className="flex flex-wrap items-center gap-3">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://franckniat.me"
								className="text-2xl font-bold hover:text-red-500 dark:hover:text-red-400 transition-colors"
							>
								Franck NIAT
							</a>
							<span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 uppercase tracking-wider">
								Software Engineer
							</span>
						</div>

						<p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
							Initiateur et concepteur principal de la plateforme collaborative ESIAC-BIBLIO. Développé pour encourager le partage, l&apos;émulation et l&apos;excellence académique des étudiants de l&apos;ESIAC.
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-4 text-sm font-medium">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://franckniat.me"
								className="text-primary hover:underline flex items-center gap-1.5"
							>
								<Globe size={16} /> https://franckniat.me
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/franckniat"
								className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
							>
								<Github size={16} /> GitHub
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
