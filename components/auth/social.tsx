"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Google, Github } from "react-bootstrap-icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SocialButtons() {
	const onClick = async (provider: string) => {
		await signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};
	return (
		<div className="max-w-md mx-auto grid grid-cols-2 gap-2">
			<Button
				variant={"outline"}
				className="w-full gap-2"
				title="Se connecter avec Google"
				onClick={() => onClick("google")}
			>
				<Google size={18} /> Google
			</Button>
			<Button
				variant={"outline"}
				className="w-full gap-2"
				title="Se connecter avec Github"
				onClick={() => onClick("github")}
			>
				<Github size={18} /> Github
			</Button>
		</div>
	);
}
