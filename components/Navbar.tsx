"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from './ui/button';

const Navbar = () => {
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
                        <Link
                            href="/"
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
                        <Link
                            href="/inscription"
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                            S'inscrire
                        </Link>
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
                        <div className="flex items-center gap-4">
                            <Link href="/search">
                                <Button className="hidden md:inline-flex bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-full px-6 border border-slate-200">
                                    Mon Espace
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
