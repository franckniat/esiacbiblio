"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookmarkX } from "lucide-react";
export default function ErrorNotfound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-3">
			<DotLottieReact
				src={"/not-found.json"}
				className="w-1/3 h-1/3"
				loop
				autoplay
			/>
			<h1 className="text-2xl font-bold flex items-center gap-2">
				<span className="text-red-500 flex items-center gap-2">
					<BookmarkX size={20} /> 404
				</span>{" "}
				- Page Non trouvée
			</h1>
			<p className="text-gray-500">
				La page que vous cherchez n&apos;existe pas.
			</p>
			<Link href={"/"}>
				<Button
					variant={"ghost"}
					className="absolute top-10 left-5 gap-2 group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all duration-300" />
					Retour à la page d&apos;accueil
				</Button>
			</Link>
		</div>
	);
}
