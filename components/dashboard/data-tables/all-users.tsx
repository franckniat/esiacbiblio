"use client";
import * as React from "react";
import { User } from "@prisma/client";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

export function AllUsers({ data }: { data: User[] }) {
	const [search, setSearch] = useQueryState("name", { defaultValue: "" });
	const [selectedRole, setSelectedRole] = useQueryState("role", {
		defaultValue: "all",
	});
	const [selectedAuth, setSelectedAuth] = useQueryState("auth", {
		defaultValue: "all",
	});
	const [selectedVerified, setSelectedVerified] = useQueryState("verified", {
		defaultValue: "all",
	});
	const [filteredUsers, setFilteredUsers] = React.useState<User[]>(data);

	React.useEffect(() => {
		let filtered = data;

		if (search) {
			filtered = filtered.filter((user) =>
				user.name?.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (selectedRole !== "all") {
			filtered = filtered.filter((user) => user.role === selectedRole);
		}

		if (selectedAuth !== "all") {
			filtered = filtered.filter((user) =>
				selectedAuth === "true" ? user.is0Auth : !user.is0Auth
			);
		}

		if (selectedVerified !== "all") {
			filtered = filtered.filter((user) =>
				selectedVerified === "true"
					? user.emailVerified
					: !user.emailVerified
			);
		}

		setFilteredUsers(filtered);
	}, [search, selectedRole, selectedAuth, selectedVerified, data]);

	return (
		<div className="space-y-4">
			<div className="flex items-center flex-col sm:flex-row justify-center w-full sm:w-auto sm:justify-end gap-2 py-4">
				<Input
					placeholder="Rechercher par nom..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-sm"
				/>

				<Select value={selectedRole} onValueChange={setSelectedRole}>
					<SelectTrigger className="max-w-[180px]">
						<SelectValue placeholder="Filtrer par rôle" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Tous les rôles</SelectItem>
						<SelectItem value="admin">Admin</SelectItem>
						<SelectItem value="user">Utilisateur</SelectItem>
					</SelectContent>
				</Select>

				<Select value={selectedAuth} onValueChange={setSelectedAuth}>
					<SelectTrigger className="max-w-[180px]">
						<SelectValue placeholder="Filtrer par auth" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Tous</SelectItem>
						<SelectItem value="true">OAuth</SelectItem>
						<SelectItem value="false">Non OAuth</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={selectedVerified}
					onValueChange={setSelectedVerified}
				>
					<SelectTrigger className="max-w-[180px]">
						<SelectValue placeholder="Filtrer par vérification" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Tous</SelectItem>
						<SelectItem value="true">Vérifié</SelectItem>
						<SelectItem value="false">Non vérifié</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredUsers.map((user) => (
					<Link
						href={`/dashboard/admin/users/${user.id}`}
						key={user.id}
					>
						<Card className="hover:bg-accent/50 transition-colors cursor-pointer">
							<CardHeader className="flex flex-row items-center gap-4">
								<Avatar className="w-12 h-12">
									<AvatarImage
										src={user.image ?? undefined}
									/>
									<AvatarFallback className="bg-primary/20">
										{user.name?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex items-center gap-2">
									<h3 className="font-semibold text-base">
										{user.name}
									</h3>
									{user.role === "admin" && (
										<BadgeCheck
											size={18}
											className="text-primary"
										/>
									)}
								</div>
							</CardHeader>
							<CardContent className="space-y-2">
								<p className="text-sm text-muted-foreground">
									{user.email}
								</p>
								{user.status !== "active" && (
									<p className="text-red-500 font-medium text-sm px-2 py-0.5 rounded-md bg-red-500/20 w-fit">
										Bloqué
									</p>
								)}
								<div className="flex items-center gap-2 text-sm">
									<span className="font-medium">
										Email vérifié:
									</span>
									<span
										className={
											user.emailVerified
												? "text-primary"
												: "text-amber-500"
										}
									>
										{user.emailVerified ? "Oui" : "Non"}
									</span>
								</div>
								<div className="flex items-center gap-2 text-sm">
									<span className="font-medium">Auth:</span>
									<span>
										{user.is0Auth ? "OAuth" : "Email"}
									</span>
								</div>
								<div className="text-sm text-muted-foreground">
									Créé le:{" "}
									{new Date(
										user.createdAt
									).toLocaleDateString()}
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{filteredUsers.length === 0 && (
				<div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-md p-4 min-h-[200px] flex items-center justify-center">
					Aucun utilisateur trouvé.
				</div>
			)}
		</div>
	);
}
