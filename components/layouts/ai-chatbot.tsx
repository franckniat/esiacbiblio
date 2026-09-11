"use client";
import React, { useState } from "react";
import { ArrowUpRight, CircleStop, CornerDownLeft, Sparkles, GraduationCap, ShieldAlert } from "lucide-react";
import {
	ChatBubble,
	ChatBubbleAvatar,
	ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
	ExpandableChat,
	ExpandableChatHeader,
	ExpandableChatBody,
	ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "../ui/button";
import { useChat } from "@ai-sdk/react";
import { useCurrentUser } from "@/hooks/use-currentuser";
import Link from "next/link";
import StyledMarkdown from "@/components/styled-markdown";

export default function ChatSupport() {
	const { user } = useCurrentUser();
	const [quotaExceeded, setQuotaExceeded] = useState(false);

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		stop,
		error,
		reload,
	} = useChat({
		initialMessages: [
			{
				id: "welcome-message",
				role: "assistant",
				content: "Bonjour ! Je suis **BiblioBot**, votre assistant pédagogique et académique officiel d'ESIAC-BIBLIO 🎓.\n\nJe suis là pour vous aider dans vos révisions, vos cours (Génie Logiciel, Réseaux, Gestion, Électronique) et la méthodologie de vos rapports de stage. Quelle est votre question d'étude aujourd'hui ?",
			},
		],
		onError: (err) => {
			console.error("Erreur Chatbot:", err);
			if (err.message?.includes("Quota invité") || (err as any)?.status === 429) {
				setQuotaExceeded(true);
			}
		},
		onResponse: (response) => {
			if (response.status === 429) {
				setQuotaExceeded(true);
			}
		},
	});

	return (
		<ExpandableChat size="lg" position="bottom-right">
			<ExpandableChatHeader className="flex-col text-center justify-center text-sm py-3 px-4 bg-primary/10 border-b border-border">
				<div className="flex items-center justify-center gap-2">
					<GraduationCap className="text-primary size-5" />
					<h1 className="text-base font-bold text-foreground">
						BiblioBot Académique ✨
					</h1>
				</div>
				<p className="text-xs text-muted-foreground mt-0.5">
					Assistance aux cours et révisions universitaires ESIAC
				</p>
				{!user && (
					<div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-background/80 text-foreground/80 border border-border">
						<span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
						Accès libre (5 questions offertes)
					</div>
				)}
			</ExpandableChatHeader>

			<ExpandableChatBody className="p-3">
				<ChatMessageList className="text-sm space-y-3">
					{messages.map((message) => (
						<ChatBubble
							key={message.id}
							variant={message.role === "user" ? "sent" : "received"}
							className={message.role === "user" ? "max-w-[75%]" : "max-w-[95%]"}
						>
							<ChatBubbleAvatar
								fallback={message.role === "user" ? (user?.name?.charAt(0) || "U") : "🎓"}
								className={message.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}
							/>
							<ChatBubbleMessage className="text-sm px-3.5 py-2.5 rounded-2xl">
								<StyledMarkdown content={message.content} />
							</ChatBubbleMessage>
						</ChatBubble>
					))}

					{isLoading && (
						<ChatBubble variant="received">
							<ChatBubbleAvatar fallback="🎓" className="bg-primary/20 text-primary" />
							<ChatBubbleMessage isLoading className="px-3.5 py-2.5" />
						</ChatBubble>
					)}

					{quotaExceeded && (
						<div className="my-3 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-foreground space-y-2 text-xs">
							<div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
								<ShieldAlert size={16} />
								Quota invité atteint (5/5 questions)
							</div>
							<p className="text-muted-foreground">
								Vous avez utilisé vos 5 questions gratuites. Rejoignez la communauté étudiante pour continuer à poser vos questions en illimité !
							</p>
							<div className="pt-1 flex gap-2">
								<Link href="/auth/register" className="w-full">
									<Button size="sm" className="w-full gap-1.5 font-medium">
										Créer un compte gratuit
										<ArrowUpRight size={14} />
									</Button>
								</Link>
							</div>
						</div>
					)}

					{error && !quotaExceeded && (
						<div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center justify-between">
							<span>Une erreur est survenue lors de la communication avec l'assistant.</span>
							<Button variant="outline" size="sm" onClick={() => reload()}>
								Réessayer
							</Button>
						</div>
					)}
				</ChatMessageList>
			</ExpandableChatBody>

			<ExpandableChatFooter className="p-2.5 border-t border-border bg-background">
				{quotaExceeded ? (
					<div className="w-full flex justify-between items-center px-2 py-1">
						<span className="text-xs text-muted-foreground">Créez un compte pour discuter en illimité</span>
						<Link href="/auth/login">
							<Button size="sm" variant="outline" className="text-xs">
								Se connecter
							</Button>
						</Link>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary p-1 w-full"
					>
						<ChatInput
							onChange={handleInputChange}
							value={input}
							name="prompt"
							disabled={isLoading}
							placeholder="Posez une question sur vos cours, rapports ou révisions..."
							className="min-h-11 resize-none rounded-lg bg-background border-0 px-3 py-2 text-xs sm:text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<div className="flex items-center justify-between px-2 pt-0 pb-1">
							<span className="text-[11px] text-muted-foreground flex items-center gap-1">
								<Sparkles size={12} className="text-primary" /> Questions académiques
							</span>
							{isLoading ? (
								<Button
									type="button"
									size="sm"
									variant="destructive"
									className="gap-1.5 h-7 text-xs px-2.5"
									onClick={() => stop()}
								>
									<CircleStop className="size-3" />
									Arrêter
								</Button>
							) : (
								<Button
									type="submit"
									size="sm"
									disabled={!input.trim()}
									className="gap-1.5 h-7 text-xs px-3"
								>
									Envoyer
									<CornerDownLeft className="size-3" />
								</Button>
							)}
						</div>
					</form>
				)}
			</ExpandableChatFooter>
		</ExpandableChat>
	);
}
