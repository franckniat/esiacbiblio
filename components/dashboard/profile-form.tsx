"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserProfile } from "@/actions/user";
import { Loader2, Save } from "lucide-react";

interface ProfileFormProps {
    user: {
        name: string;
        bio?: string | null;
        email: string;
    };
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [name, setName] = useState(user.name || "");
    const [bio, setBio] = useState(user.bio || "");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const res = await updateUserProfile({ name, bio });
            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success(res?.success || "Profil mis à jour !");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                    L&apos;adresse email ne peut pas être modifiée directement.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Biographie académique</Label>
                <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Présentez brièvement votre parcours, filière ou centres d'intérêt à l'ESIAC..."
                    rows={4}
                    disabled={isPending}
                />
            </div>

            <Button type="submit" disabled={isPending} className="gap-2 font-semibold">
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4" /> Enregistrer les modifications
                    </>
                )}
            </Button>
        </form>
    );
}

