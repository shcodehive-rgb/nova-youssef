import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PricingSection = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-zinc-950/50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Invest in Your <span className="text-primary">Success</span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        Choose the plan that fits your goals. From exam preparation to personalized coaching, we have you covered.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid gap-8 md:grid-cols-3 lg:gap-12">

                    {/* Card 1: Pack Essentiel */}
                    <div className="flex flex-col p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pack Essentiel</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Best for 2ème année bac (SVT & PC)</p>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">200 DH</span>
                                <span className="text-sm font-medium text-gray-500">/ Semestre</span>
                            </div>
                        </div>
                        <ul className="flex-1 space-y-4 mb-8">
                            {[
                                "Préparation Examen National",
                                "1ère séance gratuite",
                                "Cours à distance"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="rounded-full p-1 bg-orange-100 dark:bg-orange-900/30 text-primary mt-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-orange-50 dark:hover:bg-orange-950/30">
                            S'inscrire
                        </Button>
                    </div>

                    {/* Card 2: Pack Avancé */}
                    <div className="flex flex-col p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-primary/20 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pack Avancé</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Perfect for ambitious students</p>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">300 DH</span>
                                <span className="text-sm font-medium text-gray-500">/ Semestre</span>
                            </div>
                        </div>
                        <ul className="flex-1 space-y-4 mb-8">
                            {[
                                "Cours Détaillé (Vidéo + PDF)",
                                "Correction Détaillée",
                                "Lives chaque semaine",
                                "Enregistrement des lives",
                                "Groupe Whatsapp"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="rounded-full p-1 bg-orange-100 dark:bg-orange-900/30 text-primary mt-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-orange-500/20">
                            S'inscrire
                        </Button>
                    </div>

                    {/* Card 3: Pack VIP */}
                    <div className="flex flex-col p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-950">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
                            RECOMMMANDÉ
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pack VIP</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">For those who want excellence</p>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">500 DH</span>
                                <span className="text-sm font-medium text-gray-500">/ Semestre</span>
                            </div>
                        </div>
                        <ul className="flex-1 space-y-4 mb-8">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Everything in Avancé +</p>
                            {[
                                "Suivi Personnalisé (Coaching)",
                                "Devoirs surveillés corrigés",
                                "Access Prioritaire Prof"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="rounded-full p-1 bg-orange-100 dark:bg-orange-900/30 text-primary mt-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold text-lg h-14">
                            Je veux l'Excellence
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PricingSection;
