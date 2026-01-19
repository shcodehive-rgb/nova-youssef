"use client";

import { MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FAQSection = () => {
    const faqs = [
        {
            question: "Comment je reçois mon argent ?",
            answer: "Vous recevez vos gains par virement bancaire (CIH, Attijari, etc.) ou Wafacash chaque semaine. Aucun frais caché, vous gardez 100% de vos revenus sur les plans payants."
        },
        {
            question: "Est-ce que mes élèves peuvent télécharger les vidéos ?",
            answer: "Non, notre lecteur vidéo sécurisé empêche le téléchargement direct pour protéger votre contenu. Vos cours restent exclusifs et sécurisés sur la plateforme."
        },
        {
            question: "Dois-je payer l'hébergement web ?",
            answer: "Non, tout est inclus. L'hébergement, la sécurité et les mises à jour sont gérés par nous. Vous n'avez qu'à vous concentrer sur la création de vos cours."
        },
        {
            question: "Puis-je commencer gratuitement ?",
            answer: "Oui, le plan Découverte est gratuit à vie pour tester la plateforme avec vos premiers élèves. Aucune carte bancaire requise pour démarrer."
        },
        {
            question: "Prenez-vous une commission ?",
            answer: "0% de commission sur les plans payants (Prof & Expert). Vous gardez 100% de vos gains. Le plan gratuit inclut une commission standard de 10% pour couvrir les frais de traitement."
        }
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Left Column - Sticky Header & Support Card */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                                Vos questions, nos réponses.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Tout ce que vous devez savoir pour lancer votre école en ligne.
                            </p>
                        </div>

                        {/* WhatsApp Support Card */}
                        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                    <MessageCircle className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 mb-2">
                                        Vous avez une autre question ?
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Notre équipe est disponible pour vous aider.
                                    </p>
                                    <Link href="https://wa.me/212XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="default"
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            Discuter sur WhatsApp
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Accordion */}
                    <div className="lg:col-span-2">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-slate-50 rounded-xl px-6 border-none"
                                >
                                    <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:no-underline py-6">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};
