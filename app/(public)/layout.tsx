import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navigation";
import React from "react";
import ScrollTop from "@/components/scroll-top";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<ScrollTop />
			{children}
			<Footer />
		</>
	);
}
