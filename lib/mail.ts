import {Resend} from "resend";
import { EmailTemplate } from '@/components/auth/email-template';
import { getUserByEmail } from "@/data/user";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEMail = async (email:string, token:string)=>{
    const user = await getUserByEmail(email);
    const confirmLink = `https://esiacbiblio.vercel.app/auth/new-verification?token=${token}`;
    if(!user) return {
        error: "Utilisateur non trouvé !"
    };
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Vérification de votre adresse email",
        react: EmailTemplate({
            firstName: user?.name as string,
            email: email,
            customLink: confirmLink
        }),
    })
}