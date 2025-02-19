"use client";
import {ArrowUpRight, CircleStop, CornerDownLeft} from "lucide-react";
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
import { useRouter } from "next/navigation";
import StyledMarkdown from "@/components/styled-markdown";

export default function ChatSupport() {
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
		onFinish: (message, { usage, finishReason }) => {
			console.log("Finished streaming message:", message);
			console.log("Token usage:", usage);
			console.log("Finish reason:", finishReason);
		},
		onError: (error) => {
			console.error("An error occurred:", error);
		},
		onResponse: (response) => {
			console.log("Received HTTP response from server:", response);
		},
	});
	const { user } = useCurrentUser();
	const router = useRouter();

	return (
		<ExpandableChat size="lg" position="bottom-right">
			<ExpandableChatHeader className="flex-col text-center justify-center text-sm">
				<h1 className="text-lg font-semibold">
					Discuter avec notre IA ✨
				</h1>
				<p>Posez vos questions et obtenez des réponses instantanées.</p>
			</ExpandableChatHeader>
			<ExpandableChatBody>
				{user && (
					<ChatMessageList className="text-sm">
						{messages.map((message, index) => (
							<ChatBubble
								key={index}
								variant={`${
									message.role === "user"
										? "sent"
										: "received"
								}`}
								className={`${message.role === "user" ? "max-w-[60%]" : "max-w-[90%]"}`}
							>
								<ChatBubbleAvatar
									fallback={`${
										message.role === "user" ? "You" : "AI"
									}`}
								/>
								<ChatBubbleMessage className={`text-sm px-3 py-3`}>
									<StyledMarkdown content={message.content} />
								</ChatBubbleMessage>
							</ChatBubble>
						))}
						{error && (
							<>
								<div>An error occurred.</div>
								<Button variant={"outline"} type="button" onClick={() => reload()}>
									Retry
								</Button>
							</>
						)}
						{isLoading && (
							<ChatBubble variant="received">
								<ChatBubbleAvatar fallback="AI" />
								<ChatBubbleMessage isLoading />
							</ChatBubble>
						)}
					</ChatMessageList>
				)}
				{!user && (
					<ChatMessageList className="text-sm">
						<ChatBubble variant="received">
							<ChatBubbleAvatar fallback="AI" />
							<ChatBubbleMessage>
								<StyledMarkdown
									content={
										"Connectez-vous ou créer un compte pour discuter avec notre IA."
									}
								/>
							</ChatBubbleMessage>
						</ChatBubble>
					</ChatMessageList>
				)}
			</ExpandableChatBody>
			<ExpandableChatFooter>
				{user && (
					<form
						onSubmit={handleSubmit}
						className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
					>
						<ChatInput
							onChange={handleInputChange}
							value={input}
							name="prompt"
							disabled={isLoading}
							placeholder="Discutez avec notre IA"
							className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<div className="flex items-center p-3 pt-0">
							{isLoading ? (
								<Button
									size="sm"
									variant={"destructive"}
									className="ml-auto gap-1.5"
									onClick={() => stop()}
								>
									<CircleStop className="size-3.5" />
									Arrêter
								</Button>
							) : (
								<Button size="sm" className="ml-auto gap-1.5">
									Envoyer le message
									<CornerDownLeft className="size-3.5" />
								</Button>
							)}
						</div>
					</form>
				)}
				{!user && (
					<div className="flex items-center p-3 pt-0">
						<Button
							size="sm"
							className="ml-auto gap-1.5"
							onClick={() => {
								router.push("/auth/login");
							}}
						>
							Se connecter
							<ArrowUpRight className="size-3.5" />
						</Button>
					</div>
				)}
			</ExpandableChatFooter>
		</ExpandableChat>
	);
}
