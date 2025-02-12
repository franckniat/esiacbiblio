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

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({ content }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				h1: ({ node, ...props }) => (
					<h1 className="text-3xl font-extrabold my-4" {...props} />
				),
				h2: ({ node, ...props }) => (
					<h2 className="text-2xl font-bold my-3" {...props} />
				),
				h3: ({ node, ...props }) => (
					<h3 className="text-xl font-bold my-2" {...props} />
				),
				h4: ({ node, ...props }) => (
					<h4 className="text-lg font-semibold my-2" {...props} />
				),
				h5: ({ node, ...props }) => (
					<h5 className="text-base font-semibold my-1" {...props} />
				),
				h6: ({ node, ...props }) => (
					<h6 className="text-sm font-semibold my-1" {...props} />
				),
				p: ({ node, ...props }) => (
					<p className="text-base leading-relaxed my-2" {...props} />
				),
				a: ({ node, ...props }) => (
					<a className="text-primary hover:underline" {...props} />
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 border-primary pl-4 italic text-gray-600 my-4"
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul className="list-disc pl-4 md:pl-6 my-2" {...props} />
				),
				ol: ({ node, ...props }) => (
					<ol className="list-decimal pl-4 md:pl-6 my-2" {...props} />
				),
				code: ({ className, style, ...props }) => {
					let language;
					if (className) {
						language =
							className.replace("language-", "") || "plainText";
					}
					const isInline = className === undefined;
					return isInline ? (
						<code
							className={
								"text-sm text-primary p-0.5 bg-foreground/5 rounded-sm"
							}
						>
							{props.children}
						</code>
					) : (
						<div
							className={`${jetBrainsMono.className} text-sm px-1 relative group`}
						>
							<div className="flex justify-between gap-2 items-center">
								<span className="text-sm text-foreground/80">
									{language}
								</span>
								<button className="p-2 flex sm:hidden">Copier le code</button>
							</div>
							<Button
								variant={"outline"}
								size={"icon"}
								className="absolute hidden sm:flex top-9 right-3 opacity-0 group-hover:opacity-100 transition-all scale-100 active:scale-95 w-8 h-8"
								onClick={() => {
									navigator.clipboard.writeText(content);
									toast.success(
										"Contenu ajouté dans le presse-papiers"
									);
								}}
							>
								<Copy size={15} />
							</Button>
							<SyntaxHighlighter
								language={language}
								className={`${jetBrainsMono.className} antialiased max-w-3xl overflow-x-scroll code-content`}
							>
								{String(props.children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						</div>
					);
				},
				pre: ({ node, ...props }) => (
					<pre
						className={`bg-foreground/5 text-foreground p-4 rounded-lg overscroll-auto`}
						{...props}
					/>
				),
				hr: ({ node, ...props }) => (
					<hr
						className="border-t-2 border-gray-300 my-4"
						{...props}
					/>
				),
				strong: ({ node, ...props }) => (
					<strong className="font-semibold" {...props} />
				),
				em: ({ node, ...props }) => (
					<em className="italic" {...props} />
				),
				del: ({ node, ...props }) => (
					<del className="line-through text-gray-500" {...props} />
				),
				table: ({ node, ...props }) => (
					<Table className="w-full border border-foreground/10 my-4" {...props} />
				),
				thead: ({ node, ...props }) => (
					<thead className="bg-background/5 sr-only" {...props} />
				),
				tbody: ({ node, ...props }) => (
					<TableBody {...props} />
				),
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

export default StyledMarkdown;
