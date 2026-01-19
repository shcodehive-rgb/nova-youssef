"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsletterSection = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter signup
        console.log("Newsletter signup:", email);
        setEmail("");
    };

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                            Vous en savez déjà plus que vous ne le pensez.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Chaque semaine, nous partageons des conseils pour aider les profs marocains à réussir en ligne.
                            Inscrivez-vous, c'est gratuit.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Votre adresse email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 h-12 px-4 text-base"
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-8 font-semibold whitespace-nowrap"
                            >
                                Rejoindre la communauté
                            </Button>
                        </form>
                        <p className="text-xs text-slate-500 mt-3">
                            Pas de spam. Désinscription en un clic.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
