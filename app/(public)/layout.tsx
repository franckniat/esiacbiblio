import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navigation";
import React from "react";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
