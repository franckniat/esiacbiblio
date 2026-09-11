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
	const [likesCount, setLikesCount] = useState(document.likes.length);

	useEffect(() => {
		if (user) {
			const isLiked = document.likes.find(
				(like) => like.userId === user.id
			);
			setLiked(!!isLiked);
		}
		setLikesCount(document.likes.length);
	}, [user, document]);

	const handleLike = useCallback(async (e?: React.MouseEvent) => {
		e?.stopPropagation();
		if (user?.id) {
			const userLike = document.likes.find(
				(like) => like.userId === user.id
			);
			const newLikedState = !liked;
			setLiked(newLikedState);
			setLikesCount((prev) => (newLikedState ? prev + 1 : Math.max(0, prev - 1)));
			await createLikeDocument(user.id, id, userLike?.id);
		} else {
			toast.error("Veuillez vous connecter pour pouvoir liker");
		}
	}, [user?.id, document.likes, id, liked]);
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
									size={likesCount > 0 ? "default" : "icon"}
									variant={"ghost"}
									onClick={handleLike}
									className="active:scale-95 transition-transform gap-2"
								>
									<Heart
										size={20}
										fill={liked ? "#ef4444" : "none"}
										className={liked ? "text-red-500" : ""}
									/>
									{likesCount > 0 && likesCount}
								</Button>
							</div>
						</CardContent>
					</Card>
				</DialogTrigger>
				<DialogContent className={"max-w-3xl max-h-[90vh] overflow-y-auto"}>
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">{document.title}</DialogTitle>
						<DialogDescription className="text-sm">
							{document.description}
						</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-1 gap-4">
						<div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border">
							<div className="space-y-0.5">
								<p className="text-sm font-semibold">
									Par : {document.user.name || "Étudiant ESIAC"}
								</p>
								<p className="text-xs text-primary font-medium">
									Filière : {document.sector}
								</p>
								<p className="text-xs text-muted-foreground">
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
							<div className="flex items-center gap-3">
								{document.fileURL && (
									<a
										href={document.fileURL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											size="sm"
											className="gap-2"
											onClick={handleDownload}
										>
											<Download size={16} /> Télécharger
										</Button>
									</a>
								)}
								<Button
									variant={"outline"}
									onClick={handleLike}
									size="sm"
									className="gap-2"
								>
									<Heart
										size={16}
										fill={liked ? "#ef4444" : "none"}
										className={liked ? "text-red-500" : ""}
									/>
									{likesCount > 0 && likesCount}
								</Button>
							</div>
						</div>
					</div>
					<div className="mt-4">
						{document.fileURL ? (
							<>
								<iframe
									src={`${document.fileURL}#toolbar=0`}
									width="100%"
									className="rounded-xl hidden sm:block h-[450px] border border-border"
									title={document.title}
								/>
								<div className="sm:hidden p-4 rounded-xl bg-muted/30 border border-border text-center space-y-3">
									<p className="text-xs text-muted-foreground">
										Aperçu PDF complet disponible sur grand écran. Sur mobile, vous pouvez ouvrir directement le fichier :
									</p>
									<a href={document.fileURL} target="_blank" rel="noopener noreferrer" className="block w-full">
										<Button className="w-full gap-2 font-semibold">
											<Download size={16} /> Ouvrir le document PDF
										</Button>
									</a>
								</div>
							</>
						) : (
							<p className="text-sm text-muted-foreground text-center py-6">Aucun fichier joint.</p>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
