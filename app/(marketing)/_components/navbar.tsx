"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { User } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";

export const MarketingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <div className="hover:opacity-75 transition items-center gap-x-2 flex">
                        <p className="font-bold text-xl text-slate-900 pb-1">
                            Nova <span className="text-orange-600">Academy</span>
                        </p>
                    </div>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        {/* No links here, pure sales page */}
                    </div>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button className="hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full px-6 gap-2">
                                <User className="h-4 w-4" />
                                <span>Se connecter</span>
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Link href="/teacher/courses">
                            <Button variant="ghost" className="mr-4">
                                Tableau de bord
                            </Button>
                        </Link>
                        <UserMenu />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};
