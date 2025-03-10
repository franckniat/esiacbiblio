"use client"
import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Footer(){
    return(
        <footer className="max-w-[1340px] mx-auto pt-5 pb-10 border-t border-foreground/5">
        <section className="mx-2 md:mx-5 border-b border-foreground/5 pb-5">
            <div className="flex flex-col md:flex-row justify-between gap-5 flex-wrap">
                <div className="flex flex-col">
                    <Image height={500} width={500} className="w-[100px] h-[100px]" src="/images/logo_esiac.png" alt=""/>
                    <h1 className="font-bold max-w-xs uppercase tracking-wide text-lg">Ecole supérieure d{"'"}Ingénieurie et de management d{"'"}Afrique Centrale</h1>
                </div>
                <div className="flex flex-col gap-3 border-b border-gray-100 dark:border-neutral-600 py-5 md:border-none">
                    <h1 className="text-gray-600 dark:text-neutral-200">Ressources</h1>
                    <div className="flex flex-col gap-3">
                        <Link href="/articles" className="text-sm hover:underline font-medium">Articles</Link>
                        <Link href="/documents" className="text-sm hover:underline font-medium">Documents</Link>
                        <Link href="#" className="text-sm hover:underline font-medium flex gap-1 items-center">
                            Discussions
                            <Badge className="hover:no-underline">Bientot</Badge>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3 py-5 border-b border-foreground/5 md:border-none">
                    <h1 className="text-gray-600 dark:text-neutral-200">Légal</h1>
                    <div className="flex flex-col gap-3">
                        <Link href="/privacy" className="text-sm hover:underline font-medium">Confidentialité</Link>
                        <Link href="/terms" className="text-sm hover:underline font-medium">Condition d{"'"}utilisation</Link>
                        <Link href="/rules" className="text-sm hover:underline font-medium">Code de conduite</Link>
                        <Link href="/faq" className="text-sm hover:underline font-medium">FAQ</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3 py-5">
                    <h1 className="text-gray-600 dark:text-neutral-200">Rejoignez nous.</h1>
                    <p className="text-sm text-gray-600 dark:text-neutral-600 max-w-md">Souscrivez à notre newsletter pour recevoir de nouveaux articles, documents, ...</p>
                    <div className="flex flex-col gap-3">
                        <form>
                            <Input type="email" className="peer w-full sm:max-w-xl md:max-w-3xl" placeholder="Entrez votre adresse email" required/>
                            <p className="text-xs text-red-600 invisible peer-invalid:visible"></p>
                            <Button type="submit" className="mt-3 w-full sm:w-fit">Soumettre</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <div className="flex justify-center flex-col md:flex-row md:justify-between gap-2 pt-5 mx-5">
            <div>
                <Button variant="ghost" size="icon">
                    <a target="_blank" href="https://github.com/franckniat/esiac-biblio"><Github size={20} /></a>
                </Button>
                <Button variant="ghost" size="icon">
                    <a target="_blank" href="https://twitter.com/manuel_niat"><Twitter size={20} /></a>
                </Button>
            </div>
            <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-500">
                    Copyright © 2024. Tous droits réservés.
                </p>
                <div className="my-3 text-neutral-600 dark:text-neutral-500">Build with ❤️ by <a className="text-sm text-red-600 hover:underline" href="https://github.com/franckniat">Franck NIAT</a></div>
            </div>
            
        </div>
    </footer>
    )
}