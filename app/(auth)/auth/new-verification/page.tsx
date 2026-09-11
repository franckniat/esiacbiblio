import VerificationForm from "@/components/auth/verification-form";
import { Suspense } from "react";

export default function NewVerificationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <VerificationForm />
        </Suspense>
    );
}