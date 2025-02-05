/* eslint-disable @typescript-eslint/no-unused-vars */
import DocumentCard from "@/components/document";
import { SortData } from "@/components/document/sort-data";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { getActiveDocuments } from "@/data/document";
import { Metadata } from "next";
import PublicDocuments from "@/components/document/public-document";
import {getCategories, getSectors} from "@/data/items";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Documents - ESIAC BIBLIO",
		description:
			"Venez à la découverte d'une multitude de rapports, cours et documents.",
	};
}

export default async function Documents() {
	const documents = await getActiveDocuments();
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
								{ name: "Documents", href: "/documents" },
							]}
						/>
					</section>
					<div className="space-y-4">
						<h1 className="text-3xl font-bold">Documents</h1>
						<p className="text-sm">
							Venez à la découverte d&#039;une multitude de
							rapports, cours et documents.
						</p>
					</div>
				</section>
				<PublicDocuments sectors={sectors} categories={categories} documents={documents}/>
			</main>
		</>
	);
}
