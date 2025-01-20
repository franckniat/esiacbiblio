"use client"; // this registers <Editor> as a Client Component
import { 
  BlockNoteView, 
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps{
  onChange: () => void;
}

export default function Editor({
  onChange,
  ...props
}:EditorProps) {

  const { resolvedTheme } = useTheme();
  const {edgestore} = useEdgeStore();

  const handleUpload  = async(file:File)=>{
    const response = await URL.createObjectURL(file);
    return response;
  }
  const handleDelete = async(url:string)=>{
    await edgestore.publicFiles.delete({
      url
    })
  }
  const editor = useCreateBlockNote({
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView 
      editor={editor} 
      onChange={onChange} 
      className="w-full" 
      theme={"light"} 
      title="Ajouter un article" 
      lang="fr-FR"
      sideMenu={true}
    />
  );
}
