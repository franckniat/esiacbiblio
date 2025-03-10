import { useMediaQuery } from "usehooks-ts";
import ArticleContent from "./article-content";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription, DrawerHeader } from "../ui/drawer";
import { ArticleWithIncludes } from "@/types";
import { Button } from "../ui/button";
import { ScanEye } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function ArticlePreview({
	article,
}: {
	article: ArticleWithIncludes;
}) {
	const isMobile = useMediaQuery("(min-width: 768px)");
	if (!isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button
						variant={"secondary"}
						size={"icon"}
						title="Aperçu de l'article"
					>
						<ScanEye size={18} />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Aperçu de l&#39;article</DrawerTitle>
                        <DrawerDescription>
                            Publié le {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </DrawerDescription>
                    </DrawerHeader>
					<ScrollArea className="max-h-[85vh] overflow-y-scroll">
						<ArticleContent article={article} isPreview />
					</ScrollArea>
				</DrawerContent>
			</Drawer>
		);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"secondary"}
					size={"icon"}
					title="Aperçu de l'article"
				>
					<ScanEye size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Aperçu de l&#39;article</DialogTitle>
                    <DialogDescription>
                        Publié le {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </DialogDescription>
                </DialogHeader>
				<ScrollArea className="max-h-[80vh]">
					<div className="p-4">
                    <ArticleContent article={article} isPreview />
                    </div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
