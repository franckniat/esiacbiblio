"use client";
import { Github, Twitter, Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="border-t border-border/50 bg-foreground/[0.01] mt-20">
            <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/50">
                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                height={60}
                                width={60}
                                className="w-12 h-12 rounded-lg object-contain"
                                src="/images/logo_esiac.png"
                                alt="Logo ESIAC"
                            />
                            <div>
                                <span className="font-extrabold tracking-tight text-lg block">
                                    ESIAC<span className="text-primary">.</span>BIBLIO
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Bibliothèque Numérique
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            École Supérieure d&apos;Ingénierie et de Management d&apos;Afrique Centrale (ESIAC).
                            Plateforme collaborative d&apos;apprentissage et de diffusion du savoir.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                            Ressources
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/documents" className="hover:text-primary transition-colors">
                                    Documents &amp; Annales
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="hover:text-primary transition-colors">
                                    Articles &amp; Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    À propos du projet
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-primary transition-colors">
                                    Centre d&apos;aide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Standards */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                            Informations
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    Mission académique
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="hover:text-primary transition-colors">
                                    Support &amp; Contact
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://thanks.dev/u/gh/franckniat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                                >
                                    Soutenir le projet ⚡️
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Stay connected */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                            Restez informé
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Recevez les annonces des nouveaux documents et sujets d&apos;examens ajoutés.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="space-y-2"
                        >
                            <Input
                                type="email"
                                placeholder="votre.email@etudiant.esiac.cm"
                                className="text-xs bg-background/50 h-9"
                            />
                            <Button type="submit" variant="success" size="sm" className="w-full font-medium text-xs">
                                S&apos;abonner
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar with author credit */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} ESIAC-BIBLIO. Développé pour la communauté étudiante.
                    </p>

                    <div className="flex items-center gap-1.5 font-medium">
                        <span>Conçu avec</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
                        <span>par</span>
                        <a
                            href="https://franckniat.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary font-semibold transition-colors underline decoration-primary/40 underline-offset-4"
                        >
                            Franck NIAT (Software Engineer)
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://franckniat.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                            title="Site web de Franck NIAT"
                        >
                            <Globe size={16} />
                        </a>
                        <a
                            href="https://github.com/franckniat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                            title="GitHub"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href="https://twitter.com/manuel_niat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                            title="Twitter"
                        >
                            <Twitter size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}