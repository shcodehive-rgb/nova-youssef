"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, X } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MarketingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        <span className="text-slate-900">Amina</span>
                        <span className="text-orange-600">Salah</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Produit Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors outline-none">
                            Produit
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                            <DropdownMenuItem asChild>
                                <Link href="#cours" className="flex flex-col items-start py-3 cursor-pointer">
                                    <span className="font-semibold text-slate-900">Cours en ligne</span>
                                    <span className="text-xs text-slate-500">Créez et vendez vos formations</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#site-web" className="flex flex-col items-start py-3 cursor-pointer">
                                    <span className="font-semibold text-slate-900">Site Web</span>
                                    <span className="text-xs text-slate-500">Votre propre site sans coder</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#paiements" className="flex flex-col items-start py-3 cursor-pointer">
                                    <span className="font-semibold text-slate-900">Paiements</span>
                                    <span className="text-xs text-slate-500">Encaissez par CIH/Wafacash</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Ressources Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors outline-none">
                            Ressources
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                            <DropdownMenuItem asChild>
                                <Link href="#exemples" className="flex flex-col items-start py-3 cursor-pointer">
                                    <span className="font-semibold text-slate-900">Exemples</span>
                                    <span className="text-xs text-slate-500">Voir ce que les autres ont créé</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/blog" className="flex flex-col items-start py-3 cursor-pointer">
                                    <span className="font-semibold text-slate-900">Blog</span>
                                    <span className="text-xs text-slate-500">Conseils pour les profs</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Tarifs Link */}
                    <Link href="/tarifs" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                        Tarifs
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" className="text-sm font-medium">
                                Se connecter
                            </Button>
                        </SignInButton>
                        <Link href="/sign-up">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6">
                                Commencer gratuitement
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/home">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6">
                                Tableau de bord
                            </Button>
                        </Link>
                    </SignedIn>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex flex-col gap-6 mt-8">
                                {/* Mobile Produit Section */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Produit</h3>
                                    <SheetClose asChild>
                                        <Link href="#cours" className="flex flex-col py-2 pl-4 border-l-2 border-transparent hover:border-orange-600 transition-colors">
                                            <span className="font-medium text-slate-900">Cours en ligne</span>
                                            <span className="text-xs text-slate-500">Créez et vendez vos formations</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="#site-web" className="flex flex-col py-2 pl-4 border-l-2 border-transparent hover:border-orange-600 transition-colors">
                                            <span className="font-medium text-slate-900">Site Web</span>
                                            <span className="text-xs text-slate-500">Votre propre site sans coder</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="#paiements" className="flex flex-col py-2 pl-4 border-l-2 border-transparent hover:border-orange-600 transition-colors">
                                            <span className="font-medium text-slate-900">Paiements</span>
                                            <span className="text-xs text-slate-500">Encaissez par CIH/Wafacash</span>
                                        </Link>
                                    </SheetClose>
                                </div>

                                {/* Mobile Ressources Section */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Ressources</h3>
                                    <SheetClose asChild>
                                        <Link href="#exemples" className="flex flex-col py-2 pl-4 border-l-2 border-transparent hover:border-orange-600 transition-colors">
                                            <span className="font-medium text-slate-900">Exemples</span>
                                            <span className="text-xs text-slate-500">Voir ce que les autres ont créé</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="/blog" className="flex flex-col py-2 pl-4 border-l-2 border-transparent hover:border-orange-600 transition-colors">
                                            <span className="font-medium text-slate-900">Blog</span>
                                            <span className="text-xs text-slate-500">Conseils pour les profs</span>
                                        </Link>
                                    </SheetClose>
                                </div>

                                {/* Mobile Tarifs */}
                                <SheetClose asChild>
                                    <Link href="/tarifs" className="font-medium text-slate-900 py-2">
                                        Tarifs
                                    </Link>
                                </SheetClose>

                                {/* Mobile Auth Buttons */}
                                <div className="flex flex-col gap-3 pt-6 border-t">
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <Button variant="outline" className="w-full">
                                                Se connecter
                                            </Button>
                                        </SignInButton>
                                        <Link href="/sign-up">
                                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                                Commencer gratuitement
                                            </Button>
                                        </Link>
                                    </SignedOut>
                                    <SignedIn>
                                        <SheetClose asChild>
                                            <Link href="/home">
                                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                                    Tableau de bord
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                    </SignedIn>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};
