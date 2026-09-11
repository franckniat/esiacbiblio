import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, Users, Sparkles, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "À propos | ESIAC-BIBLIO",
    description: "Découvrez la vision et la mission de la bibliothèque numérique ESIAC-BIBLIO.",
};

export default function AboutPage() {
    return (
        <main className="max-w-[1340px] mx-auto px-4 py-12 md:py-16">
            {/* Header Hero */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" /> Notre Histoire &amp; Mission
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    La bibliothèque pensée pour l&apos;excellence académique à <span className="bg-gradient-to-r from-red-500 via-primary to-emerald-600 bg-clip-text text-transparent">l&apos;ESIAC</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    ESIAC-BIBLIO est une plateforme numérique collaborative conçue pour faciliter l&apos;accès aux ressources pédagogiques, annales d&apos;examens, fiches de révision et travaux de recherche pour l&apos;ensemble des filières de l&apos;ESIAC.
                </p>
            </section>

            {/* Core Pillars */}
            <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4 hover:border-primary/50 transition">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">Accès Libre &amp; Centralisé</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Plus besoin de chercher des heures : tous les documents, cours, travaux dirigés et corrigés sont indexés par niveau, spécialité et matière.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4 hover:border-primary/50 transition">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <Users className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">Esprit Communautaire</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Chaque étudiant et enseignant peut publier ses contributions, rédiger des articles méthodologiques et échanger des conseils dans un cadre stimulant.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4 hover:border-primary/50 transition">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">Assistance IA Éducative</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Un tuteur intelligent intégré qui répond exclusivement dans le cadre académique et universitaire pour vous guider dans vos révisions et recherches.
                    </p>
                </div>
            </section>

            {/* Values / Quote */}
            <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl font-bold">Construit par les étudiants, pour les étudiants</h3>
                    <p className="text-muted-foreground">
                        Le projet est né d&apos;un besoin simple : fluidifier le partage de connaissances au sein de l&apos;École Supérieure d&apos;Ingénierie et de Management d&apos;Afrique Centrale.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/documents">
                        <Button size="lg" variant="success" className="font-semibold shadow-sm">
                            Explorer les documents
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Creator & Contributors */}
            <section className="mt-20">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Auteur &amp; Contributeurs</h2>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-border max-w-xl shadow-xs">
                    <Image
                        src="/images/profile_master.jpg"
                        alt="Franck NIAT"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-xs"
                    />
                    <div className="space-y-2 text-center sm:text-left">
                        <div>
                            <h3 className="text-xl font-bold">Franck NIAT</h3>
                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                Software Engineer
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Software Engineer, initiateur et mainteneur principal de la plateforme ESIAC-BIBLIO.
                        </p>
                        <div className="flex justify-center sm:justify-start gap-3 pt-1">
                            <Link href="https://franckniat.me" target="_blank" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                                <Globe className="w-4 h-4" /> franckniat.me
                            </Link>
                            <Link href="https://github.com/franckniat" target="_blank" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <Github className="w-4 h-4" /> GitHub
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
