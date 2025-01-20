"use client";

import { Button, buttonVariants } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function DeleteButton({
    contentButton,
    handleDelete,
}: {
    contentButton: React.ReactNode,
    itemName?: string,
    handleDelete: () => Promise<void> | void
}) {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Button variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>{contentButton}</Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Voulez vous vraiment supprimer cet élément ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Vous ne pourrez plus revenir en arrière après cette action, êtes-vous sûr de vouloir continuer ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction className={cn(buttonVariants({ variant: "destructive" }))} onClick={handleDelete}>Oui</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
