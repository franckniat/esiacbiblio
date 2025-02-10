"use client";
import React, {useMemo} from "react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Space_Grotesk} from "next/font/google";
import { BlockNoteView } from "@blocknote/mantine";
import {Block, BlockNoteEditor, PartialBlock} from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

interface EditorProps {
    onChange: () => void;
    editor: BlockNoteEditor;
    defaultValue?: string;
}

const space_grotesk = Space_Grotesk({subsets: ["latin"]});


export default function Editor({editor, onChange, defaultValue}: EditorProps) {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        if (theme === "dark") {
            setIsDark(true);
        } else if (theme === "light") {
            setIsDark(false);
        }
    }, [theme]);
    async function saveToStorage(jsonBlocks: Block[]) {
        // Save contents to local storage. You might want to debounce this or replace
        // with a call to your API / database.
        localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
    }

    async function loadFromStorage() {
        // Gets the previously stored editor contents.
        const storageString = localStorage.getItem("editorContent");
        return storageString
            ? (JSON.parse(storageString) as PartialBlock[])
            : undefined;
    }

    const [initialContent, setInitialContent] = useState<
        PartialBlock[] | undefined | "loading"
    >("loading");

    useEffect(() => {
        loadFromStorage().then((content) => {
            setInitialContent(content);
        });
    }, []);

    const editor2 = useMemo(() => {
        if (initialContent === "loading") {
            return undefined;
        }
        return BlockNoteEditor.create({ initialContent });
    }, [initialContent]);

    if (editor === undefined) {
        return "Loading content...";
    }

    return (
        <BlockNoteView
            editor={editor}
            onChange={onChange}
            className={`${space_grotesk.style}`}
            theme={isDark ? "dark" : "light"}
            lang="fr-FR"
            emojiPicker={true}
            defaultValue={defaultValue}
            formattingToolbar={true}
            id={"editor"}
        />
    );
}
