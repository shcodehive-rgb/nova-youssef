"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { User } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserMenu } from "@/components/user-menu";

import { Button } from './ui/button';

interface NavbarProps {
    config?: {
        logoUrl?: string | null;
        logoText1?: string | null;
        logoColor1?: string | null;
        logoText2?: string | null;
        logoColor2?: string | null;
        name?: string | null;
    } | null;
}

const Navbar = ({ config }: NavbarProps) => {
    const pathname = usePathname();
    const isMarketingPage = pathname === "/" || pathname?.startsWith("/inscription");

    if (isMarketingPage) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 min-h-[80px] h-auto py-2 md:py-4">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <div className="hover:opacity-75 transition items-center gap-x-2 flex">
                        {config?.logoUrl ? (
                            <div className="relative h-14 w-40 md:h-24 md:w-[320px] shrink-0">
                                <Image
                                    fill
                                    alt="Logo"
                                    src={config.logoUrl}
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        ) : (config?.logoText1 || config?.logoText2) ? (
                            <p className="font-extrabold text-2xl pb-1 tracking-tight">
                                <span style={{ color: config.logoColor1 || "#000000" }}>{config.logoText1}</span>
                                <span style={{ color: config.logoColor2 || "#ea580c" }}>{config.logoText2}</span>
                            </p>
                        ) : (
                            <p className="font-extrabold text-2xl text-slate-900 pb-1 tracking-tight">
                                {config?.name || "Nova"} <span className="text-orange-600">Academy</span>
                            </p>
                        )}
                    </div>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/home"
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/search"
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                            Cours
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                            Blog
                        </Link>
                    </div>

                    <SignedOut>
                        <UserMenu isGuest />
                    </SignedOut>

                    <SignedIn>
                        <UserMenu />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
