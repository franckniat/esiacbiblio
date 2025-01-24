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
    handleDeleteAction,
    message,
    header,
}: {
    contentButton: React.ReactNode,
    itemName?: string,
    header: string,
    message: string,
    handleDeleteAction: () => void
}) {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Button variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>{contentButton}</Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{header}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction className={cn(buttonVariants({ variant: "destructive" }))} onClick={handleDeleteAction}>Oui</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
