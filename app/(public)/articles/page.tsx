import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { Metadata } from "next";
import PublicArticles from "@/components/article/public-article";
import { getActiveArticles } from "@/data/article";
import { getSectors, getTags } from "@/data/items";
import { Suspense } from "react";
import { Newspaper, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Articles & Tutoriels - ESIAC BIBLIO",
		description:
			"Découvrez des articles et tutoriels rédigés par la communauté d'ingénieurs et de managers de l'ESIAC.",
	};
}

export default async function Articles() {
	const [articles, tags, sectors] = await Promise.all([
		getActiveArticles(),
		getTags(),
		getSectors(),
	]);

	return (
		<main className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Header Section */}
			<section className="mb-8 space-y-4">
				<CustomBreadcrumb
					path={[
						{ name: "Accueil", href: "/" },
						{ name: "Articles", href: "/articles" },
					]}
				/>

				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
					<div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
							<Newspaper className="w-3.5 h-3.5" /> Publications &amp; Guides
						</div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
							Articles &amp; Méthodologies
						</h1>
						<p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
							Découvrez des synthèses de cours, tutoriels techniques, veilles technologiques et retours d&apos;expérience rédigés par les étudiants et formateurs de l&apos;ESIAC.
						</p>
					</div>

					<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/60 self-start md:self-auto">
						<Sparkles className="w-3.5 h-3.5 text-primary" />
						<span>{articles.length} articles publiés</span>
					</div>
				</div>
			</section>

			{/* Interactive Articles Explorer */}
			<Suspense
				fallback={
					<div className="flex justify-center items-center py-20 text-muted-foreground gap-2">
						<div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
						<span>Chargement des articles...</span>
					</div>
				}
			>
				<PublicArticles articles={articles} sectors={sectors} tags={tags} />
			</Suspense>
		</main>
	);
}
