import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEMail = async (email:string, token:string)=>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Vérification de votre adresse email",
        html: `<p>Clique <a href="${confirmLink}"> ici<a/> Pour vérifier ton adresse email<p/>`
    })
}