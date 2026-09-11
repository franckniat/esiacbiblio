import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Award, ShieldCheck, Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PublicUserProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const decodedName = decodeURIComponent(username);

    const user = await db.user.findFirst({
        where: {
            OR: [
                { id: username },
                { name: decodedName },
            ],
        },
        include: {
            documents: {
                where: { isVisible: true },
                orderBy: { createdAt: "desc" },
                take: 12,
            },
            articles: {
                where: { isVisible: true },
                orderBy: { createdAt: "desc" },
                take: 12,
            },
            _count: {
                select: {
                    documents: true,
                    articles: true,
                },
            },
        },
    });

    if (!user) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                    <User className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold">Utilisateur introuvable</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Le membre que vous recherchez n&apos;existe pas ou a modifié son identifiant.
                </p>
                <Link href="/documents">
                    <Button variant="outline">Retourner aux documents</Button>
                </Link>
            </main>
        );
    }

    const exp = user.expPoints || 0;
    const getLevelTitle = (points: number) => {
        if (points >= 1000) return "Maître Contributeur";
        if (points >= 600) return "Érudit";
        if (points >= 300) return "Contributeur Actif";
        if (points >= 100) return "Apprenti";
        return "Novice";
    };

    return (
        <main className="max-w-[1340px] mx-auto px-4 py-10 space-y-8">
            {/* Profile Banner Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-xs flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-24 h-24 md:w-28 md:h-28 border-2 border-primary/30 shadow-md">
                    {user.image ? (
                        <AvatarImage src={user.image} alt={user.name || "Avatar"} />
                    ) : (
                        <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    )}
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                        <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                        <div className="flex gap-2 justify-center">
                            <Badge variant="secondary" className="capitalize">
                                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary" />
                                {user.role}
                            </Badge>
                            <Badge variant="outline" className="text-primary border-primary/30">
                                <Award className="w-3.5 h-3.5 mr-1" />
                                {getLevelTitle(exp)} ({exp} EXP)
                            </Badge>
                        </div>
                    </div>

                    <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                        {user.bio || "Membre de la communauté étudiante de l'ESIAC."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <BookOpen className="w-4 h-4 text-emerald-500" /> {user._count.documents} document{user._count.documents > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <FileText className="w-4 h-4 text-emerald-500" /> {user._count.articles} article{user._count.articles > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> Inscrit en {new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contributions Tabs */}
            <Tabs defaultValue="documents" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="documents" className="gap-2">
                        <BookOpen className="w-4 h-4" /> Documents ({user.documents.length})
                    </TabsTrigger>
                    <TabsTrigger value="articles" className="gap-2">
                        <FileText className="w-4 h-4" /> Articles ({user.articles.length})
                    </TabsTrigger>
                </TabsList>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-6">
                    {user.documents.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl p-8">
                            Aucun document partagé pour le moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.documents.map((doc) => (
                                <Card key={doc.id} className="hover:border-primary/50 transition-colors shadow-xs">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-2">
                                            <Badge variant="outline" className="text-xs">
                                                {doc.sector}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                        <CardTitle className="text-base font-bold line-clamp-1 mt-2">
                                            {doc.title}
                                        </CardTitle>
                                        <CardDescription className="text-xs line-clamp-2">
                                            {doc.description || "Aucune description fournie."}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Link href={`/documents/${doc.id}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                            Consulter le document <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Articles Tab */}
                <TabsContent value="articles" className="mt-6">
                    {user.articles.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl p-8">
                            Aucun article publié pour le moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.articles.map((art) => (
                                <Card key={art.id} className="hover:border-primary/50 transition-colors shadow-xs">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {art.sector}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(art.createdAt).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                        <CardTitle className="text-base font-bold line-clamp-2 mt-2">
                                            {art.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Link href={`/articles/${art.slug}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                            Lire l&apos;article <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </main>
    );
}

