import React from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Nova <span className="text-orange-600">Academy</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Empowering the next generation of Moroccan scientists and engineers.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Plateforme</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    Nos Cours
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Légal */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Informations</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    Conditions d&apos;utilisation
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                    Politique de confidentialité
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Besoin d&apos;aide ?</h3>
                        <a
                            href="https://wa.me/212600000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-md hover:bg-green-100 transition border border-green-200 w-full"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-medium text-sm">Discuter sur WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} Nova Academy. Built with ❤️ in Morocco.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <Facebook className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors">
                            <Instagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="#" className="text-slate-400 hover:text-red-600 transition-colors">
                            <Youtube className="w-5 h-5" />
                            <span className="sr-only">YouTube</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
