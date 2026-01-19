"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
        title: "Vidéos Gratuites & Payantes",
        description: "Attirez les élèves avec des chapitres gratuits, et verrouillez le reste pour les abonnés payants.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Online course video player interface"
    },
    {
        title: "Fichiers & Exercices PDF",
        description: "Ajoutez des résumés, des séries d'exercices et des corrections téléchargeables sous chaque leçon.",
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Stack of books and study notes"
    },
    {
        title: "Contrôle Total du Site",
        description: "Gérez votre page d'accueil, écrivez vos articles de blog et affichez vos réseaux sociaux.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Professional dashboard with charts and data"
    },
    {
        title: "Accès Instantané",
        description: "Dès que l'élève paie (CIH/Wafacash), les cours payants se débloquent automatiquement.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Electronic payment success"
    }
];

export const FeaturesSection = () => {
    return (
        <section id="cours" className="py-24 px-6 bg-slate-50 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Tout pour votre soutien scolaire en ligne
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Une plateforme complète pour créer, gérer et monétiser vos cours de soutien scolaire
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
                            >
                                {/* Feature Image */}
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={feature.imageUrl}
                                        alt={feature.imageAlt}
                                        className="h-full w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-slate-600 mb-6">
                        Prêt à lancer votre plateforme de soutien scolaire ?
                    </p>
                    <Link href="/sign-up">
                        <Button
                            size="lg"
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                            Commencer gratuitement
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
