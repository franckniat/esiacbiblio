import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { Metadata } from "next";
import PublicArticles from "@/components/article/public-article";
import {getActiveArticles} from "@/data/article";
import {getCategories, getSectors} from "@/data/items";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Articles - ESIAC BIBLIO",
		description:
			"Venez à la découverte d'une multitude d'articles passionnants rédigés par notre communauté.",
	};
}

export default async function Articles() {
	const articles = await getActiveArticles();
	const categories = await getCategories();
	const sectors = await getSectors();
	return (
		<>
			<main className="max-w-[1340px] mx-auto px-2">
				<section className="mx-2 md:mx-5 pt-10 sm:pt-22">
					<section className="text-sm">
						<CustomBreadcrumb
							path={[
								{ name: "Accueil", href: "/" },
								{ name: "Articles", href: "/articles" },
							]}
						/>
					</section>
					<div className="space-y-4">
						<h1 className="text-3xl font-bold">Articles</h1>
						<p className="text-sm">
							Venez à la découverte d&#039;une multitude d&#039;articles passionnants rédigés par notre communauté.
						</p>
					</div>
				</section>
				<PublicArticles articles={articles} sectors={sectors} categories={categories} />
			</main>
		</>
	);
}
