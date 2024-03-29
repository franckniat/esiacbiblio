"use client";
import { Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface DocumentProps {
    id:string,
    title: string |null,
    author?: string |null,
    description: string |null,
    date?: string |null,
    sector: string|null,
    fileURL: string|null,
}

export default function DocumentCard(props:DocumentProps){
    const router = useRouter();
    const handleDownload = ()=>{
        toast.success("Document en cours de téléchargement ... ");
    };
    return(
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="hover:-translate-y-0 sm:hover:-translate-y-1 bg-neutral-white  will-change-transform cursor-pointer block transition rounded-lg border dark:text-neutral-50 hover:bg-slate-100 dark:hover:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-xl line-clamp-1">{props.title}</CardTitle>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-green-600">{props.sector}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">{props.author?.toUpperCase()}</p>
                                    <p className=" text-sm">publié le {props.date}</p>
                                </div>
                            </CardHeader>
                        <CardContent className="-mt-2">
                            <h2 className="text-base line-clamp-1 text-justify tracking-tight">{props.description}</h2>
                            <div className="flex gap-4 mt-3 ">
                                {props.fileURL && <Button size="icon" onClick={()=>toast("Document téléchargé")}><Download size={20}/></Button>}
                            </div>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl">{props.title}</h1>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm">{props.author?.toUpperCase()}</p>
                                <p className="text-sm text-green-600">{props.sector}</p>
                                <p>Publié le {props.date}</p>
                            </div>
                            </div>
                        <div className="">
                            <p className="text-base text-justify tracking-tight">{props.description}</p>
                            <div className="flex gap-4 mt-3 ">
                                {props.fileURL && 
                                    <a href={props.fileURL}>
                                        <Button size="icon" onClick={handleDownload}>
                                            <Download size={20}/>
                                        </Button>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}