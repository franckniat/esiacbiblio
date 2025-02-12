import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navigation";
import React from "react";
//import ScrollTop from "@/components/layouts/scroll-top";
import ChatSupport from "@/components/layouts/ai-chatbot";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{/* <ScrollTop /> */}
			<ChatSupport />
			{children}
			<Footer />
		</>
	);
}
