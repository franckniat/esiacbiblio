import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home() {
	const session = await auth();
	return (
		<main className="max-w-[1340px] mx-auto px-2 ">
			<section
				className="hero flex justify-center flex-col h-[calc(100vh-200px)] px-4"
				style={{
					backgroundSize: "1200px",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<section className="flex justify-center">
					<Link
						href="/support"
						className="group bg-foreground/5 inline-flex active:scale-95 transition items-center hover:bg-foreground/10 p-1 pr-2 rounded-full sm:text-base lg:text-sm xl:text-base"
					>
						<div className="px-3 py-0.5 text-xs font-semibold leading-5 uppercase tracking-wide rounded-full bg-foreground/10">
							⚡️Sponsor
						</div>
						<div className="ml-4 hidden text-sm sm:block">
							Soutenez C-GIT aujourd&#039;hui en nous
							sponsorisant.
						</div>
						<div className="ml-4 text-sm sm:hidden">
							Soutenez C-GIT
						</div>
						<ChevronRight size={15} strokeWidth={3} className="group-hover:translate-x-0.5 ml-2 transition-transform"/>
					</Link>
				</section>
				<section className="mt-10 text-center">
					<h1 className="text-5xl sm:text-6xl font-bold sm:font-extrabold tracking-tighter sm:leading-none lg:text-7xl bg-gradient-to-r from-red-500 via-primary to-neutral-600 dark:bg-clip-text dark:text-transparent text-transparent bg-clip-text pr-1 inline-block">
						ESIAC-BIBLIO
					</h1>
					<p className="mt-3 text-base font-medium sm:mt-5 sm:text-lg md:text-xl lg:text-2xl tracking-wide">
						Bienvenue dans la bibliothèque numérique de l&#039;Ecole
						Supérieure d&#039;Ingénieurie et de Management
						d&#039;Afrique Centrale.
					</p>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row md:gap-6 sm:justify-center">
						<Link
							href={session ? "/dashboard" : "/auth/login"}
						>
							<Button
								variant="success"
								size={"lg"}
								className="active:scale-95 transition font-medium w-full sm:w-fit"
							>
								{session ? "Accéder au tableau de bord" : "Rejoindre la communauté"}
							</Button>
						</Link>
						<Link href="/documents">
							<Button
								variant="secondary"
								size={"lg"}
								className="active:scale-95 transition font-medium w-full sm:w-fit "
							>
								Visiter la bibliothèque
							</Button>
						</Link>
					</div>
				</section>
			</section>
			<section className="pt-10 md:pt-14 lg:pt-20 pb-5 border-b border-gray-300 dark:border-neutral-600 sm:border-none mx-2">
				<div className="text-center text-sm font-medium">
					<p className="text-foreground/60">
						Conçu par les étudiants pour les étudiants.
					</p>
				</div>
			</section>
			<section className="relative py-24 sm:py-32 pointer-events-auto">
				<div
					className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[30.5625rem] bg-gradient-to-tr from-[#ff466e] to-primary dark:opacity-30 opacity-50"
						style={{
							clipPath:
								" polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>
				<div
					className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[30.5625rem] bg-gradient-to-tr from-[#ff466e] to-primary dark:opacity-30 opacity-50"
						style={{
							clipPath:
								" polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-[1340px] px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">
							Travaillons ensemble
						</h2>
						<p className="mt-6 text-lg leading-8 text-foreground/70 font-medium">
							Créer votre compte pour ainsi contribuer au
							bien-être et au partage de connaissances au sein
							d&#039;ESIAC
						</p>
					</div>
					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
							<div className="flex flex-col-reverse">
								<dt className="text-base leading-7 dark:text-gray-300">
									Documents enregistrés
								</dt>
								<dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">
									500
								</dd>
							</div>
							<div className="flex flex-col-reverse">
								<dt className="text-base leading-7 dark:text-gray-300">
									Étudiants inscrits
								</dt>
								<dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">
									210+
								</dd>
							</div>
							<div className="flex flex-col-reverse">
								<dt className="text-base leading-7 dark:text-gray-300">
									Articles ajoutés par semaine
								</dt>
								<dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">
									10
								</dd>
							</div>
							<div className="flex flex-col-reverse">
								<dt className="text-base leading-7 dark:text-gray-300">
									Accès aux données
								</dt>
								<dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">
									Illimité et gratuit
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>
			<section className="px-5 flex flex-col py-5">
				<h2 className="text-lg font-bold tracking-tight dark:text-white sm:text-xl">
					Contributeurs :{" "}
				</h2>
				<div className="flex gap-3 flex-wrap items-center py-3">
					<a target="_blank" href="https://fndev.vercel.app">
						<Image
							src="/images/profile_master.jpg"
							title="FRANCK NIAT"
							alt="IMAGE CONTRIBUTEUR : Franck NIAT"
							width={300}
							height={300}
							className="w-[100px] h-[100px] object-cover rounded-full border-2 border-foreground/50 hover:border-red-600 transition-colors"
						/>
					</a>
				</div>
			</section>
		</main>
	);
}
