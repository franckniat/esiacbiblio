import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { getActiveDocuments } from "@/data/document";
import { Metadata } from "next";
import PublicDocuments from "@/components/document/public-document";
import { getCategories, getSectors } from "@/data/items";
import { Suspense } from "react";
import { BookOpen, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Documents & Annales - ESIAC BIBLIO",
		description:
			"Consultez les cours, devoirs surveillés, annales d'examens et mémoires de l'ESIAC.",
	};
}

export default async function Documents() {
	const [documents, categories, sectors] = await Promise.all([
		getActiveDocuments(),
		getCategories(),
		getSectors(),
	]);

	return (
		<main className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Header Section */}
			<section className="mb-8 space-y-4">
				<CustomBreadcrumb
					path={[
						{ name: "Accueil", href: "/" },
						{ name: "Documents", href: "/documents" },
					]}
				/>

				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
					<div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
							<BookOpen className="w-3.5 h-3.5" /> Bibliothèque Numérique
						</div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
							Documents &amp; Annales
						</h1>
						<p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
							Découvrez et téléchargez les cours magistraux, fiches de TD, sujets d&apos;examens passés et mémoires partagés par la communauté étudiante de l&apos;ESIAC.
						</p>
					</div>

					<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/60 self-start md:self-auto">
						<Sparkles className="w-3.5 h-3.5 text-primary" />
						<span>{documents.length} documents disponibles</span>
					</div>
				</div>
			</section>

			{/* Interactive Document Explorer */}
			<Suspense
				fallback={
					<div className="flex justify-center items-center py-20 text-muted-foreground gap-2">
						<div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
						<span>Chargement du catalogue...</span>
					</div>
				}
			>
				<PublicDocuments sectors={sectors} categories={categories} documents={documents} />
			</Suspense>
		</main>
	);
}
