import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <LoginForm />
        </Suspense>
    );
}