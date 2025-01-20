"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "@/components/auth/header";
import SocialButtons from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import Image from "next/image";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    messageLabel?: string;
    showSocials?: boolean;
}

export default function CardWrapper({
    children, headerLabel, backButtonLabel, backButtonHref, messageLabel, showSocials
}:CardWrapperProps) {
    return (
        <Card className="shadow-md w-full sm:w-[500px] mx-auto">
            <CardHeader>
                <Image src="/images/logo_esiac.png" alt="logo" width={50} height={50}/>
                <Header headerLabel={headerLabel} messageLabel={messageLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocials && (
                <CardFooter className="flex-col gap-3">
                    <div className="flex items-center gap-2 w-full">
                        <span className="w-full h-[0.5px] bg-slate-300 dark:bg-slate-700"></span>
                        <span className="text-xs w-full flex justify-center">Ou continuez avec</span>
                        <span className="w-full h-[0.5px] bg-slate-300 dark:bg-slate-700"></span>
                    </div>
                    <SocialButtons/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton backButtonHref={backButtonHref} backButtonLabel={backButtonLabel}/>
            </CardFooter>
        </Card>
    )
}