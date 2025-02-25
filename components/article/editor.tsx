/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

interface EditorProps {
	onChange: () => void;
	editor: BlockNoteEditor;
	className?: string;
	//defaultValue?: string;
}

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Editor({
	editor,
	onChange,
	//defaultValue,
	className = "",
}: EditorProps) {
	const { theme } = useTheme();
	const [isDark, setIsDark] = useState(false);
	useEffect(() => {
		if (theme === "dark") {
			setIsDark(true);
		} else if (theme === "light") {
			setIsDark(false);
		}
	}, [theme]);

	/* useEffect(() => {
		async function loadInitialHTML() {
			const blocks = await editor.tryParseMarkdownToBlocks(
				defaultValue as string
			);
			editor.replaceBlocks(editor.document, blocks);
		}
		loadInitialHTML();
	}, [editor, defaultValue]); */

	return (
		<BlockNoteView
			editor={editor}
			onChange={onChange}
			className={`${space_grotesk.style + className}`}
			theme={isDark ? "dark" : "light"}
			lang="fr-FR"
			emojiPicker={true}
			formattingToolbar={true}
			id={"editor"}
		/>
	);
}
