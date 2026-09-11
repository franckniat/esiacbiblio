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
					<Card className="group hover:-translate-y-1 bg-card hover:border-primary/50 cursor-pointer transition-all rounded-2xl border border-border/80 shadow-xs hover:shadow-md flex flex-col justify-between">
						<CardHeader className="p-5 pb-3">
							<div className="flex items-center justify-between gap-2 mb-2">
								<span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 line-clamp-1">
									{document.sector}
								</span>
								<span className="text-[11px] text-muted-foreground">
									{document.createdAt?.toLocaleDateString("fr-FR", {
										month: "short",
										year: "numeric",
									})}
								</span>
							</div>
							<CardTitle className="text-base sm:text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
								{document.title}
							</CardTitle>
							<p className="text-xs text-muted-foreground font-medium pt-0.5">
								Par {document.user.name || "Étudiant ESIAC"}
							</p>
						</CardHeader>
						<CardContent className="p-5 pt-0 space-y-4">
							<p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
								{document.description}
							</p>
							<div className="flex items-center justify-between pt-3 border-t border-border/50">
								<div className="flex items-center gap-2">
									{document.fileURL && (
										<Button size="sm" variant="secondary" className="h-8 px-3 text-xs gap-1.5 rounded-lg">
											<Download size={14} /> Aperçu
										</Button>
									)}
								</div>
								<Button
									size="sm"
									variant="ghost"
									onClick={handleLike}
									className="h-8 px-2 text-xs gap-1.5 rounded-lg active:scale-95 transition-transform"
								>
									<Heart
										size={16}
										fill={liked ? "#ef4444" : "none"}
										className={liked ? "text-red-500" : "text-muted-foreground"}
									/>
									<span className="text-xs font-medium">{likesCount}</span>
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
