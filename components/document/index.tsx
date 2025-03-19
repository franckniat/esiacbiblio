"use client";
import { Download, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import { useCallback, useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-currentuser";
import { createLikeDocument } from "@/actions/like";
import { LikeDocument, User, Document } from "@prisma/client";

import "@react-pdf-viewer/core/lib/styles/index.css";

type DocumentWithUserAndLikes = Document & {
	user: User;
	likes: LikeDocument[];
};

interface DocumentProps {
	id: string;
	document: DocumentWithUserAndLikes;
}

export default function DocumentCard({ id, document }: DocumentProps) {
	const handleDownload = () => {
		toast.success("Document en cours de téléchargement ... ");
	};
	const { user } = useCurrentUser();
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user) {
			const isLiked = document.likes.find(
				(like) => like.userId === user.id
			);
			setLiked(!!isLiked);
		}
	}, [user, document]);

	const handleLike = useCallback(async () => {
		if (user?.id) {
			const userLike = document.likes.find(
				(like) => like.userId === user.id
			);
			await createLikeDocument(user.id, id, userLike?.id);
		} else {
			toast.error("Veuillez vous connecter pour pouvoir liker");
		}
	}, [user?.id, document.likes, id]);
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Card className="hover:-translate-y-0 sm:hover:-translate-y-1 bg-neutral-white  cursor-pointer block transition-transform rounded-lg border border-foreground/5 will-change-transform hover:shadow-lg">
						<CardHeader>
							<CardTitle className="text-xl line-clamp-1">
								{document.title}
							</CardTitle>
							<div className="space-y-2 text-sm">
								<p className=" text-green-600">
									{document.sector}
								</p>
								<p className="text-foreground/50">
									{document.user.name?.toUpperCase()}
								</p>
							</div>
						</CardHeader>
						<CardContent className="-mt-2 space-y-3">
							<h2 className="text-base line-clamp-2 text-justify tracking-tight">
								{document.description}
							</h2>
							<p className="text-xs text-foreground/40">
								Publié le
								{document.createdAt?.toLocaleDateString(
									"fr-FR",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</p>
							<div className="flex gap-4 mt-3 ">
								{document.fileURL && (
									<Button size="icon">
										<Download size={20} />
									</Button>
								)}
								<Button
									size={
										document.likes.length > 0
											? "default"
											: "icon"
									}
									variant={"ghost"}
									className="active:scale-95 transition-transform gap-2"
								>
									<Heart
										size={20}
										fill={liked ? "#ef4444" : "none"}
									/>
									{document.likes.length > 0 &&
										document.likes.length}
								</Button>
							</div>
						</CardContent>
					</Card>
				</DialogTrigger>
				<DialogContent className={"max-w-2xl max-h-screen overflow-y-auto"}>
					<DialogHeader>
						<DialogTitle>{document.title}</DialogTitle>
						<DialogDescription>
							{document.description}
						</DialogDescription>
					</DialogHeader>
					<div className={"grid grid-cols-1 gap-3"}>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-3">
								<p className="text-sm font-medium">
									{document.user.name?.toUpperCase()}
								</p>
								<p className="text-sm text-green-600">
									{document.sector}
								</p>
								<p className={"text-foreground/50 text-sm"}>
									Publié le{" "}
									{document.createdAt?.toLocaleDateString(
										"fr-FR",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
								</p>
							</div>
						</div>
						<div className="mt-3">
							<div className="flex items-center gap-4 mt-3 ">
								{document.fileURL && (
									<a
										href={document.fileURL}
										target={"_blank"}
									>
										<Button
											size="icon"
											onClick={handleDownload}
										>
											<Download size={20} />
										</Button>
									</a>
								)}
								<Button
									variant={"ghost"}
									onClick={handleLike}
									size={
										document.likes.length > 0
											? "default"
											: "icon"
									}
									className="active:scale-95 transition-transform gap-3"
								>
									<Heart
										size={20}
										fill={liked ? "#ef4444" : "none"}
									/>
									{document.likes.length > 0 &&
										document.likes.length}
								</Button>
							</div>
						</div>
					</div>
					<div className="">
						<embed
							src={document.fileURL}
							width="100%"
							className={"rounded-md hidden sm:block h-[300px]"}
							height="600px"
						></embed>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
