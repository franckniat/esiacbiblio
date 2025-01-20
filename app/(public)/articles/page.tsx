import ArticleCard from "@/components/article";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Documents - ESIAC BIBLIO",
		description:
			"Venez à la découverte d'une multitude de rapports, cours et documents.",
	};
}

export default async function Articles() {
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
							Venez à la découverte d&#039;une multitude de
							rapports, cours et documents.
						</p>
					</div>
				</section>
				<section className="px-2 md:px-5 mt-5 flex-wrap sm:flex-nowrap flex items-center gap-2 justify-center md:justify-end"></section>
				<section className="px-2 md:px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10">
					{/* {documents && documents.map((document, index) => (
                        <DocumentCard
                            key={index}
                            id={document.id}
                            author={document.user?.name}
                            title={document.title}
                            description={document.description}
                            date={document?.createdAt?.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                            sector={document.sector}
                            fileURL={document.fileURL}
                        />
                    ))} */}
					<ArticleCard
						id={"document.id"}
						author={"Franck NIAT"}
						title={"Comment avoir un projet d'apprentissage ?"}
						description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis veritatis quidem, ratione minima odit architecto animi eligendi. Vel nemo sunt ad! Ut modi, similique aspernatur nemo at itaque enim?"}
						date={"12/25/2021"}
						author_image="/images/profile_master.jpg"
						article_image="/images/bibliodark.png"
					/>
					<ArticleCard
						id={"document.id"}
						author={"Franck NIAT"}
						title={"Comment avoir un projet d'apprentissage ?"}
						description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis veritatis quidem, ratione minima odit architecto animi eligendi. Vel nemo sunt ad! Ut modi, similique aspernatur nemo at itaque enim?"}
						date={"12/25/2021"}
						author_image="/images/profile_master.jpg"
						article_image="/images/bibliodark.png"
					/>
				</section>
			</main>
		</>
	);
}
