/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { JetBrains_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

interface StyledMarkdownProps {
	content: string;
}

const StyledMarkdownArticle: React.FC<StyledMarkdownProps> = ({ content }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				h1: ({ node, ...props }) => (
					<h1
						className="text-3xl font-bold leading-tight my-4 text-foreground"
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className="text-2xl font-semibold leading-snug mt-6 mb-3 text-foreground"
						{...props}
					/>
				),
				h3: ({ node, ...props }) => (
					<h3
						className="text-xl font-semibold leading-snug mt-5 mb-2 text-foreground"
						{...props}
					/>
				),
				h4: ({ node, ...props }) => (
					<h4
						className="text-lg font-medium mt-4 mb-2 text-foreground"
						{...props}
					/>
				),
				h5: ({ node, ...props }) => (
					<h5
						className="text-base font-medium mt-3 mb-1 text-foreground"
						{...props}
					/>
				),
				h6: ({ node, ...props }) => (
					<h6
						className="text-sm font-medium mt-2 mb-1 text-foreground/80"
						{...props}
					/>
				),
				p: ({ node, ...props }) => (
					<p
						className="text-lg leading-relaxed text-foreground/90 my-3"
						{...props}
					/>
				),
				a: ({ node, ...props }) => (
					<a
						className="text-primary font-medium underline hover:opacity-80"
						{...props}
					/>
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 border-primary pl-4 italic text-gray-700 bg-gray-100/50 p-3 rounded-lg my-4"
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul
						className="list-disc list-inside text-lg pl-5 my-3 space-y-2"
						{...props}
					/>
				),
				ol: ({ node, ...props }) => (
					<ol
						className="list-decimal list-inside text-lg pl-5 my-3 space-y-2"
						{...props}
					/>
				),
				li: ({ node, ...props }) => (
					<li className="text-lg text-foreground/90" {...props} />
				),
				code: ({ className, ...props }) => {
					let language;
					if (className) {
						language =
							className.replace("language-", "") || "plainText";
					}
					const isInline = className === undefined;
					return isInline ? (
						<code className="text-base text-primary bg-gray-200 px-1 py-0.5 rounded-md">
							{props.children}
						</code>
					) : (
						<div
							className={`${jetBrainsMono.className} text-sm px-1 relative group`}
						>
							<div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg">
								<span className="text-xs text-gray-600">
									{language}
								</span>
								<Button
									variant="outline"
									size="icon"
									className="w-8 h-8"
									onClick={() => {
										navigator.clipboard.writeText(
											props.children as string
										);
										toast.success("Code copié !");
									}}
								>
									<Copy size={15} />
								</Button>
							</div>
							<SyntaxHighlighter
								language={language}
								className="max-w-full overflow-x-auto rounded-b-lg bg-gray-900 text-gray-100 p-4"
							>
								{String(props.children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						</div>
					);
				},
				pre: ({ node, ...props }) => (
					<pre
						className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto"
						{...props}
					/>
				),
				hr: ({ node, ...props }) => (
					<hr className="border-t border-gray-300 my-6" {...props} />
				),
				strong: ({ node, ...props }) => (
					<strong
						className="font-semibold text-foreground"
						{...props}
					/>
				),
				em: ({ node, ...props }) => (
					<em className="italic text-foreground/90" {...props} />
				),
				del: ({ node, ...props }) => (
					<del className="line-through text-gray-500" {...props} />
				),
				table: ({ node, ...props }) => (
					<Table
						className="w-full border border-foreground/10 my-4 text-sm md:text-base"
						{...props}
					/>
				),
				thead: ({ node, ...props }) => (
					<thead className="bg-background/5 sr-only" {...props} />
				),
				tbody: ({ node, ...props }) => <TableBody {...props} />,
				tr: ({ node, ...props }) => (
					<TableRow className="bg-background/10" {...props} />
				),
				th: ({ node, ...props }) => (
					<TableHead
						className="px-4 py-2 text-left font-semibold"
						{...props}
					/>
				),
				td: ({ node, ...props }) => (
					<TableCell className="px-4 py-2" {...props} />
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

export default StyledMarkdownArticle;
