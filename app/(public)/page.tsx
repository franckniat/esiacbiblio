import { getCurrentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroSearch } from "@/components/home/hero-search";
import { 
    ChevronRight, 
    Sparkles, 
    BookOpen, 
    Users, 
    FileText, 
    GraduationCap, 
    ShieldCheck, 
    Award, 
    Compass, 
    ArrowUpRight, 
    Globe, 
    Github, 
    Twitter, 
    Download,
    MessageSquare,
    CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
    const user = await getCurrentUser();
    const [docCount, userCount, articleCount, latestDocs, latestArticles] = await Promise.all([
        db.document.count().catch(() => 500),
        db.user.count().catch(() => 210),
        db.article.count().catch(() => 50),
        db.document.findMany({
            where: { isVisible: true },
            orderBy: { createdAt: "desc" },
            take: 3,
            include: { user: true, likes: true }
        }).catch(() => []),
        db.article.findMany({
            where: { isVisible: true },
            orderBy: { createdAt: "desc" },
            take: 3,
            include: { user: true, likes: true, tags: true }
        }).catch(() => [])
    ]);

    const popularTags = [
        { label: "Génie Logiciel", href: "/documents?title=logiciel" },
        { label: "Réseaux & Télécoms", href: "/documents?title=reseau" },
        { label: "Rapports de Stage", href: "/documents?title=rapport" },
        { label: "Gestion & Économie", href: "/documents?title=gestion" },
        { label: "Cybersécurité", href: "/documents?title=securite" },
    ];

    return (
        <main className="w-full overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl" />
                <div className="absolute -top-20 right-1/4 w-[450px] h-[450px] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl" />
            </div>

            {/* 1. HERO SECTION - Expansive & Modern */}
            <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-8 hover:bg-emerald-500/15 transition-all shadow-xs">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Plateforme Académique ESIAC • Douala, Cameroun</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                </div>

                {/* Grand Heading */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.08] max-w-5xl mx-auto">
                    La Bibliothèque Numérique{" "}
                    <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        Universitaire d&apos;ESIAC
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
                    Accédez librement à des centaines de rapports de stage, mémoires de fin d&apos;études, cours magistraux et tutoriels techniques. Révisez plus efficacement avec notre <strong className="text-foreground font-semibold">assistant IA académique</strong> intégré.
                </p>

                {/* Quick Search Bar */}
                <div className="mt-10 sm:mt-12 w-full max-w-2xl mx-auto">
                    <HeroSearch />
                </div>

                {/* Popular Tags */}
                <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="font-medium mr-1">Recherches fréquentes :</span>
                    {popularTags.map((tag) => (
                        <Link 
                            key={tag.label} 
                            href={tag.href}
                            className="px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-foreground/80 hover:text-foreground border border-border/60 transition-colors"
                        >
                            {tag.label}
                        </Link>
                    ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/documents" className="w-full sm:w-auto">
                        <Button
                            variant="success"
                            size="lg"
                            className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all gap-2"
                        >
                            <BookOpen className="w-5 h-5" />
                            Explorer les documents
                        </Button>
                    </Link>
                    <Link href={user ? "/dashboard" : "/auth/register"} className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full sm:w-auto h-12 px-8 text-base font-medium active:scale-95 transition-all border border-border"
                        >
                            {user ? "Tableau de bord" : "Rejoindre la communauté"}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* 2. REAL-TIME STATS BANNER */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-y border-border/50 bg-muted/20 rounded-3xl mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {docCount}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Rapports & Documents
                        </span>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {userCount}+
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Étudiants & Contributeurs
                        </span>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {articleCount}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Articles & Retours d&apos;expérience
                        </span>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                            IA 24/7
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Assistant Google Gemini
                        </span>
                    </div>
                </div>
            </section>

            {/* 3. CORE PILLARS & FEATURES SECTION */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <Badge variant="outline" className="px-3 py-1 font-semibold text-emerald-600 border-emerald-500/30">
                        Excellence Académique
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                        Tout pour réussir vos examens et soutenances
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground">
                        Une suite d&apos;outils et de ressources pensée sur-mesure pour les exigences des filières d&apos;ingénierie et de gestion d&apos;ESIAC.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Rapports & Mémoires</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Consultez des rapports de stage certifiés et soutenus par les promotions précédentes pour vous inspirer et structurer vos travaux.
                            </p>
                        </div>
                        <Link href="/documents" className="mt-6 inline-flex items-center text-xs font-semibold text-emerald-600 hover:underline gap-1">
                            Consulter les archives <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-sky-500/40 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-5">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Assistant IA Académique</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Posez vos questions de cours en Génie Logiciel, Réseaux, Télécoms ou Gestion sans connexion préalable avec Google Gemini.
                            </p>
                        </div>
                        <div className="mt-6 inline-flex items-center text-xs font-semibold text-sky-600 gap-1">
                            Accès libre pour tous <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-5">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Articles & Tutoriels</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Partagez vos découvertes et guides techniques grâce à un éditeur moderne et échangez via les commentaires.
                            </p>
                        </div>
                        <Link href="/articles" className="mt-6 inline-flex items-center text-xs font-semibold text-amber-600 hover:underline gap-1">
                            Lire les articles <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-purple-500/40 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Gamification & EXP</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Gagnez des points d&apos;expérience (EXP) à chaque partage de document ou rédaction d&apos;article et hissez-vous au rang des meilleurs.
                            </p>
                        </div>
                        <Link href={user ? "/dashboard/account" : "/auth/register"} className="mt-6 inline-flex items-center text-xs font-semibold text-purple-600 hover:underline gap-1">
                            Voir son niveau <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. AI SPOTLIGHT BANNER */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 via-background to-teal-950/30 border border-emerald-500/30 p-8 sm:p-12 lg:p-16">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                            <Sparkles className="w-4 h-4" /> Nouveauté Google Gemini
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                            Un tuteur IA personnel pour vos révisions
                        </h2>
                        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                            Besoin d&apos;aide pour comprendre un algorithme complexe, configurer un protocole réseau, ou rédiger l&apos;introduction de votre rapport de stage ? Notre assistant virtuel est formé pour vous répondre avec rigueur académique.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2 text-xs text-emerald-200">
                            <span className="px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                                💡 &quot;Explique-moi le modèle OSI&quot;
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                                📝 &quot;Comment structurer mes remerciements de stage ?&quot;
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                                💻 &quot;Exemple d&apos;API REST en Node.js&quot;
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LATEST RESOURCES SECTION (Documents & Articles) */}
            {(latestDocs.length > 0 || latestArticles.length > 0) && (
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <Badge variant="outline" className="mb-2">Récemment Publiés</Badge>
                            <h2 className="text-3xl font-extrabold tracking-tight">Dernières contributions de la communauté</h2>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/documents">
                                <Button variant="outline" size="sm" className="text-xs">Voir tous les documents</Button>
                            </Link>
                            <Link href="/articles">
                                <Button variant="outline" size="sm" className="text-xs">Voir tous les articles</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestDocs.map((doc: any) => (
                            <Link key={doc.id} href={`/documents/${doc.id}`} className="group">
                                <div className="h-full p-5 rounded-2xl bg-card border border-border group-hover:border-emerald-500/50 group-hover:shadow-md transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <Badge variant="secondary" className="text-[11px] font-medium">
                                                {doc.sector || "Général"}
                                            </Badge>
                                            <span className="text-[11px] text-muted-foreground">
                                                {doc.category}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                                            {doc.description}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Par {doc.user?.name || "Étudiant ESIAC"}</span>
                                        <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                                            Voir <ArrowUpRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. CONTRIBUTOR & FOUNDER SECTION - Grand, Élégant et Spacieux */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-24">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-500/30">
                        Auteur &amp; Concepteur
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        À propos du contributeur
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Une initiative née de la volonté d&apos;offrir aux étudiants d&apos;Afrique Centrale un accès moderne et gratuit aux ressources pédagogiques.
                    </p>
                </div>

                <div className="relative p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-md overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Profile Image with Ring */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-sky-500 shadow-xl">
                                <Image
                                    src="/images/profile_master.jpg"
                                    alt="Franck NIAT"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white" title="Contributeur Actif">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="space-y-4 text-center md:text-left flex-1">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                                        Franck NIAT
                                    </h3>
                                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs w-fit mx-auto sm:mx-0">
                                        Software Engineer
                                    </Badge>
                                </div>
                                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                                    Concepteur &amp; Développeur Principal de la plateforme ESIAC-BIBLIO
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Ingénieur logiciel passionné par le génie logiciel, le web moderne et l&apos;intelligence artificielle. J&apos;ai conçu et développé ESIAC-BIBLIO pour permettre à l&apos;ensemble de la communauté universitaire de l&apos;ESIAC de partager, archiver et pérenniser ses connaissances dans un espace moderne, ouvert et sécurisé.
                            </p>

                            {/* Stack Badges */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Next.js 16</span>
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">React 19</span>
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Tailwind CSS v4</span>
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Better-Auth</span>
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Google Gemini AI</span>
                                <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">Prisma ORM</span>
                            </div>

                            {/* External Links */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                                <a
                                    href="https://franckniat.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="success" size="sm" className="gap-2 shadow-xs font-semibold">
                                        <Globe className="w-4 h-4" />
                                        <span>https://franckniat.me</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                                    </Button>
                                </a>
                                <a
                                    href="https://github.com/franckniat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="sm" className="gap-2 font-medium">
                                        <Github className="w-4 h-4" />
                                        <span>GitHub</span>
                                    </Button>
                                </a>
                                <a
                                    href="https://twitter.com/manuel_niat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="sm" className="gap-2 font-medium">
                                        <Twitter className="w-4 h-4" />
                                        <span>Twitter / X</span>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FINAL CALL TO ACTION (CTA) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center mb-20">
                <div className="p-8 sm:p-16 rounded-3xl bg-muted/40 border border-border space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Prêt à enrichir vos connaissances ?
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                        Rejoignez dès maintenant les étudiants de l&apos;ESIAC. Publiez vos travaux ou trouvez les ressources indispensables à vos révisions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <Link href={user ? "/dashboard/documents/new" : "/auth/register"} className="w-full sm:w-auto">
                            <Button variant="success" size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold shadow-md">
                                {user ? "Publier un document" : "Créer un compte gratuit"}
                            </Button>
                        </Link>
                        <Link href="/documents" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 font-medium">
                                Parcourir les archives
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
