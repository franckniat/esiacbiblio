"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Google, Github, Facebook } from "react-bootstrap-icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SocialButtons() {
	const onClick = async (provider: string) => {
		await signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};
	return (
		<div className="max-w-md mx-auto grid grid-cols-3 gap-2">
			<Button
				variant={"outline"}
				className="w-full"
				title="Se connecter avec Google"
				onClick={() => onClick("google")}
			>
				<Google size={18} />
			</Button>
			<Button
				variant={"outline"}
				className="w-full"
				title="Se connecter avec Github"
				onClick={() => onClick("github")}
			>
				<Github size={18} />
			</Button>
			<Button
				variant={"outline"}
				className="w-full"
				title="Se connecter avec Facebook"
				onClick={() => onClick("facebook")}
			>
				<Facebook size={18} />
			</Button>
		</div>
	);
}
