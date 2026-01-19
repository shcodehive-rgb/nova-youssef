"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const isAnnual = billingCycle === "yearly";

    const plans = [
        {
            name: "Découverte",
            price: "0",
            period: "/ mois",
            subtitle: "Pour tester la plateforme.",
            description: "Idéal pour débuter sans risque.",
            features: [
                { text: "1 Cours inclus", included: true },
                { text: "3 Vidéos (Stockage limité)", included: true },
                { text: "Jusqu'à 10 Élèves", included: true },
                { text: "Commission standard (10%)", included: true },
                { text: "Nom de domaine personnalisé", included: false },
                { text: "Support VIP", included: false },
            ],
            cta: "Commencer gratuitement",
            variant: "outline",
            popular: false,
        },
        {
            name: "Prof",
            price: isAnnual ? "1990" : "199",
            period: isAnnual ? "/ an" : "/ mois",
            subtitle: "Pour les enseignants sérieux.",
            description: "Tout ce qu'il faut pour grandir.",
            features: [
                { text: "5 Cours inclus", included: true },
                { text: "50 Vidéos (20 Go)", included: true },
                { text: "Élèves illimités", included: true },
                { text: "0% Commission", included: true },
                { text: "Nom de domaine personnalisé", included: true },
                { text: "Support VIP", included: false },
            ],
            cta: "Choisir le plan Prof",
            variant: "default",
            popular: true,
        },
        {
            name: "Expert",
            price: isAnnual ? "3990" : "399",
            period: isAnnual ? "/ an" : "/ mois",
            subtitle: "Pour les écoles et centres.",
            description: "Performance maximale sans limites.",
            features: [
                { text: "Tout en illimité (Cours & Vidéos)", included: true },
                { text: "Stockage prioritaire", included: true },
                { text: "Élèves illimités", included: true },
                { text: "0% Commission", included: true },
                { text: "Suppression du logo Aminasalah", included: true },
                { text: "Support VIP (WhatsApp)", included: true },
            ],
            cta: "Contacter les ventes",
            variant: "outline",
            popular: false,
        }
    ];

    return (
        <section id="tarifs" className="py-24 px-6 bg-slate-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Des tarifs simples et transparents
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                        Choisissez le plan qui correspond à vos besoins et faites passer votre école au niveau supérieur.
                    </p>

                    {/* Toggle Switch (Tabs) */}
                    <div className="flex justify-center mb-12">
                        <Tabs defaultValue="monthly" onValueChange={(val) => setBillingCycle(val as "monthly" | "yearly")} className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                                <TabsTrigger value="yearly">Annuel (-20%)</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={cn(
                                "relative h-full",
                                plan.popular && "z-10 md:-mt-4 md:mb-4"
                            )}
                        >
                            <Card className={cn(
                                "h-full flex flex-col",
                                plan.popular ? "border-orange-500 shadow-xl scale-100 md:scale-105" : "border-slate-200 shadow-md"
                            )}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                        <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 text-sm font-bold uppercase tracking-wide">
                                            Le Plus Populaire
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-2">
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="text-slate-500 mt-2">{plan.subtitle}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col">
                                    <div className="text-center mb-6">
                                        <span className="text-4xl font-bold text-slate-900">{plan.price} DH</span>
                                        <span className="text-slate-500 ml-1">{plan.period}</span>
                                        <p className="text-xs text-slate-400 mt-2">{plan.description}</p>
                                    </div>

                                    <div className="space-y-4 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <X className="h-5 w-5 text-slate-300 flex-shrink-0" />
                                                )}
                                                <span className={cn("text-sm", feature.included ? "text-slate-700" : "text-slate-400")}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-6">
                                    <Link href="/sign-up" className="w-full">
                                        <Button
                                            variant={plan.variant as "default" | "outline"}
                                            size="lg"
                                            className={cn(
                                                "w-full font-semibold",
                                                plan.popular ? "bg-orange-600 hover:bg-orange-700 shadow-lg" : ""
                                            )}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
