import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { getCurrentUser } from "@/lib/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/dashboard/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Sparkles, Award, ShieldCheck, Calendar } from "lucide-react";

export default async function ProfilePage() {
    const sessionUser = await getCurrentUser();
    if (!sessionUser?.id) {
        redirect("/auth/login");
    }

    const user = await db.user.findUnique({
        where: { id: sessionUser.id },
        include: {
            _count: {
                select: {
                    documents: true,
                    articles: true,
                },
            },
        },
    });

    if (!user) {
        redirect("/auth/login");
    }

    // EXP Calculation & Level tiers
    const exp = user.expPoints || 0;
    const getLevelInfo = (points: number) => {
        if (points >= 1000) return { level: 5, name: "Maître Contributeur", max: 1000, next: 1000, progress: 100 };
        if (points >= 600) return { level: 4, name: "Érudit", max: 1000, next: 1000 - points, progress: Math.min(100, Math.round(((points - 600) / 400) * 100)) };
        if (points >= 300) return { level: 3, name: "Contributeur Actif", max: 600, next: 600 - points, progress: Math.min(100, Math.round(((points - 300) / 300) * 100)) };
        if (points >= 100) return { level: 2, name: "Apprenti", max: 300, next: 300 - points, progress: Math.min(100, Math.round(((points - 100) / 200) * 100)) };
        return { level: 1, name: "Novice", max: 100, next: 100 - points, progress: Math.min(100, Math.round((points / 100) * 100)) };
    };

    const levelInfo = getLevelInfo(exp);

    return (
        <div className="px-2 md:px-4 py-4 space-y-6">
            <DashboardWrapper
                title="Mon Compte"
                path={[{ name: "Compte", href: "/dashboard/account" }]}
            >
                {/* User Header Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <Card className="lg:col-span-1 shadow-xs border-border/80">
                        <CardHeader className="text-center flex flex-col items-center">
                            <Avatar className="w-24 h-24 border-2 border-primary/20 shadow-xs mb-2">
                                {user.image ? (
                                    <AvatarImage src={user.image} alt={user.name || "Avatar"} />
                                ) : (
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
                            <CardDescription className="text-sm">{user.email}</CardDescription>
                            <div className="flex flex-wrap gap-2 justify-center mt-3">
                                <Badge variant="secondary" className="capitalize">
                                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary" />
                                    {user.role}
                                </Badge>
                                {user.emailVerified ? (
                                    <Badge variant="outline" className="text-emerald-600 border-emerald-600/30">
                                        Email vérifié
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-amber-600 border-amber-600/30">
                                        Non vérifié
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2 border-t border-border">
                            {/* Gamification Level & EXP */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold flex items-center gap-1.5 text-primary">
                                        <Award className="w-4 h-4" /> Niveau {levelInfo.level} ({levelInfo.name})
                                    </span>
                                    <span className="font-bold text-foreground/80">{exp} EXP</span>
                                </div>
                                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-emerald-500 to-primary transition-all duration-500 rounded-full"
                                        style={{ width: `${levelInfo.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-right">
                                    {levelInfo.level < 5 ? `${levelInfo.next} EXP pour le prochain niveau` : "Niveau maximum atteint !"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center">
                                    <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                                        <BookOpen className="w-4 h-4 text-emerald-500" />
                                        {user._count.documents}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Documents</p>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center">
                                    <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                                        <FileText className="w-4 h-4 text-emerald-500" />
                                        {user._count.articles}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Articles</p>
                                </div>
                            </div>

                            <div className="pt-2 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> Membre depuis le {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : "N/A"}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Profile Form */}
                    <Card className="lg:col-span-2 shadow-xs border-border/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" /> Informations du profil
                            </CardTitle>
                            <CardDescription>
                                Personnalisez vos informations visibles par les autres étudiants de l&apos;ESIAC.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProfileForm
                                user={{
                                    name: user.name,
                                    email: user.email,
                                    bio: user.bio,
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </DashboardWrapper>
        </div>
    );
}