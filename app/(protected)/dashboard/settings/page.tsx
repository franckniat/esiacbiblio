"use client";

import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Bell, Shield, User } from "lucide-react";
import Link from "next/link";

export default function SettingPage() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="px-2 md:px-4 py-4 space-y-6">
            <DashboardWrapper
                title="Paramètres"
                path={[{ name: "Paramètres", href: "/dashboard/settings" }]}
            >
                <div className="max-w-4xl space-y-6 mt-6">
                    {/* Appearance */}
                    <Card className="shadow-xs border-border/80">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Sun className="w-5 h-5 text-primary" /> Apparence
                            </CardTitle>
                            <CardDescription>
                                Choisissez le thème d&apos;affichage de l&apos;application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 max-w-md">
                                <Button
                                    type="button"
                                    variant={theme === "light" ? "default" : "outline"}
                                    onClick={() => setTheme("light")}
                                    className="flex flex-col gap-2 h-20 items-center justify-center font-medium"
                                >
                                    <Sun className="w-5 h-5" />
                                    <span>Clair</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant={theme === "dark" ? "default" : "outline"}
                                    onClick={() => setTheme("dark")}
                                    className="flex flex-col gap-2 h-20 items-center justify-center font-medium"
                                >
                                    <Moon className="w-5 h-5" />
                                    <span>Sombre</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant={theme === "system" ? "default" : "outline"}
                                    onClick={() => setTheme("system")}
                                    className="flex flex-col gap-2 h-20 items-center justify-center font-medium"
                                >
                                    <Monitor className="w-5 h-5" />
                                    <span>Système</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account and Security Shortcut */}
                    <Card className="shadow-xs border-border/80">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" /> Sécurité &amp; Compte
                            </CardTitle>
                            <CardDescription>
                                Accédez à vos paramètres de compte et vos contributions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/60">
                                <div className="space-y-0.5">
                                    <p className="font-semibold text-sm">Profil et Expérience</p>
                                    <p className="text-xs text-muted-foreground">
                                        Modifiez votre biographie, visualisez vos badges EXP et vos statistiques.
                                    </p>
                                </div>
                                <Link href="/dashboard/account">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <User className="w-4 h-4" /> Gérer le profil
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications Info */}
                    <Card className="shadow-xs border-border/80">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary" /> Notifications
                            </CardTitle>
                            <CardDescription>
                                Préférences pour les alertes de nouveaux documents et articles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Les notifications push et les alertes email lors de la publication de nouveaux examens ou cours sont actives par défaut pour tous les étudiants inscrits.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </DashboardWrapper>
        </div>
    );
}