import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import { cn } from "@/lib/utils";
import "./globals.css";

import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nova Academy - Excellence in Math & Physics",
    description: "Join Morocco's premier online academy for Baccalaureate and University students.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Fetch Global Site Config
    let siteConfig = null;
    const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;

    if (teacherId) {
        try {
            siteConfig = await db.siteConfig.findUnique({
                where: { userId: teacherId },
                select: {
                    logoUrl: true,
                    logoText1: true,
                    logoColor1: true,
                    logoText2: true,
                    logoColor2: true,
                    name: true,
                }
            });
        } catch (error) {
            console.error("Error fetching site config for layout:", error);
        }
    }

    return (
        <ClerkProvider>
            <html lang="en">
                <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
                    <ConfettiProvider />
                    <ToastProvider />
                    <ModalProvider />
                    <Navbar config={siteConfig} />
                    <main className="min-h-screen">
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
