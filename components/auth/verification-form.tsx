"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/ui/form-success";
import {FormError} from "@/components/ui/form-error";


export default function VerificationForm() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const token = searchParams.get("token");
    const onSubmit = useCallback(async () => {
        if (error || success) return;
        if (!token) {
            setError("Code de confirmation invalide !");
            return;
        }
        await newVerification(token).then((response) => {
            if (response.error) {
                setError(response.error);
                return;
            } else if (response.success){
                setSuccess(response.success);
            }
        }).catch(() => {
            setError("Une erreur s'est produite !");
        });
    }, [token, error, success]);
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <CardWrapper backButtonHref={"/auth/login"} backButtonLabel={"Retour à la page de connexion"} headerLabel={"Confirmation de votre adresse email"}>
            <div>
                {error && <FormError message={error}/>}
                {success && <FormSuccess message={success}/>}
                {!error && !success && <Loader2 className={"animate-spin"} size={48}/>}
            </div>
        </CardWrapper>
    )
}