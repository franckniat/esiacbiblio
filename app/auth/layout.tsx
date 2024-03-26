import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ESIAC-BIBLIO",
    description: "Accéder à votre compte u créer en un.",
    applicationName: "ESIAC-BIBLIO",
    creator: "Franck NIAT",
    authors: [{
      name: "Franck NIAT",
      url: "https://franckinato.vercel.app",
    }],
  }

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 dark:from-slate-600 dark:via-slate-700/50 dark:to-slate-900/50 via-slate-200/50 to-slate-500/50">
        {children}
      </div>
    );
  }