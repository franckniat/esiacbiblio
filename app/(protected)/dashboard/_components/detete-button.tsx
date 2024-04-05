"use client";
import { Button } from '@/components/ui/button'
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';


export default function DeleteButton({
    id,
    deleteFunc,
    message,
    children,
    ...props
}: {
    id: string,
    message: string,
    children: React.ReactNode,
    deleteFunc: (ref: string) => {},
}) {
    const [open, setOpen] = useState(false);
    const [isOK, setIsOK] = useState(false);
    const router = useRouter();
    return (
        <>
            <Button
                variant="danger"
                onClick={() => {
                    setOpen(true);
                }}
            >
                {children}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Voulez-vous vraiment supprimer cet élément?</DialogTitle>
                        <DialogDescription>
                            Vous etes sur le point de supprimer un élément de manière définitive. Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="danger" 
                            onClick={()=>{
                                deleteFunc(id)
                                setOpen(false)
                                toast.success(message)
                                router.refresh()
                            }}
                        >
                            Confirmer
                        </Button>
                        <DialogClose asChild>
                            <Button onClick={()=>setIsOK(false)}>Annuler</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
