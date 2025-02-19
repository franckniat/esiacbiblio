import * as React from "react";
import { Button } from "../ui/button";

interface EmailTemplateProps {
	firstName: string;
	email: string;
    customLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	email,
    customLink
}) => {
    const today = new Date();
    const salutation = today.getHours() < 12 ? "Bonjour" : "Bonsoir";
    return (
	<div className={`px-4 py-2 flex flex-col items-center space-y-4`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
		<img
			src={"/images/logo_esiac.png"}
			alt="logo"
			width={80}
			height={80}
			className={"w-[80px] h-[80px]"}
		/>
        <h1 className="text-xl font-bold py-2">Vérifiez votre adresse électronique</h1>
		<h2 className="text-lg font-bold">{salutation}, {firstName}!</h2>
        <div className="text-base">
            Félicitations ! Votre compte a été créé avec succès avec l&#39;adresse électronique suivante : <br/>
            <span className="text-primary font-medium">{email}</span>. Pour terminer le processus d&#39;inscription, veuillez confirmer votre adresse électronique en cliquant sur le bouton ci-dessous.
        </div>
        <a href={customLink} className="w-fit my-2">
            <Button>Confirmer maintenant</Button>
        </a>
        <p>
            Si le bouton ci-dessus ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur :
            <span className="text-primary font-medium">{customLink}</span>
        </p>
        <p className="text-base">
            Si vous n&#39;avez pas créé de compte, veuillez ignorer cet e-mail.
        </p>
	</div>
)};
