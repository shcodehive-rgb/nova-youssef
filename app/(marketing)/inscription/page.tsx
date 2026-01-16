"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, CreditCard, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

const InscriptionPage = () => {
    const [copied, setCopied] = useState(false);

    const rib = "000 000 0000000000000000 00"; // Placeholder

    const onCopy = () => {
        navigator.clipboard.writeText(rib);
        setCopied(true);
        toast.success("RIB copié dans le presse-papier !");
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const whatsappLink = "https://wa.me/212600000000"; // Placeholder placeholder

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Comment s'inscrire ?
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Accédez à nos cours en 3 étapes simples et sécurisées.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* Left Column: Step 1 (Payment) */}
                    <Card className="border-none shadow-lg overflow-hidden h-full">
                        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
                                    1
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Effectuez le paiement</CardTitle>
                                    <CardDescription className="text-base mt-1">
                                        Faites un virement ou un versement sur le compte bancaire suivant.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-center h-full">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 w-full relative overflow-hidden">
                                {/* Decorator */}
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <CreditCard size={100} />
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Banque</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                                CIH
                                            </div>
                                            <p className="text-lg font-bold text-slate-900">CIH Bank</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Nom du bénéficiaire</p>
                                        <p className="text-lg font-semibold text-slate-900">Professeur [Nom]</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">RIB (Numéro de compte)</p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-slate-700 font-medium flex-1 text-center sm:text-left border border-slate-200">
                                                {rib}
                                            </div>
                                            <Button
                                                onClick={onCopy}
                                                className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white"
                                            >
                                                {copied ? (
                                                    <Check className="h-4 w-4 mr-2" />
                                                ) : (
                                                    <Copy className="h-4 w-4 mr-2" />
                                                )}
                                                {copied ? "Copié !" : "Copier le RIB"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column: Steps 2 & 3 */}
                    <div className="flex flex-col gap-8">
                        {/* Step 2: Proof */}
                        <Card className="border-none shadow-lg overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600" />
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-xl">
                                        2
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Envoyez le reçu</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            Une fois le paiement effectué, envoyez-nous une photo du reçu sur WhatsApp pour validation.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                                <div className="max-w-md space-y-6">
                                    <p className="text-slate-600">
                                        Cliquez sur le bouton ci-dessous pour ouvrir une conversation WhatsApp directement avec nous. Envoyez simplement la photo du reçu.
                                    </p>
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full sm:w-auto"
                                    >
                                        <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                            <MessageCircle className="w-6 h-6 mr-2" />
                                            Envoyer le reçu maintenant
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 3: Activation */}
                        <Card className="border-none shadow-lg overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600" />
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-xl">
                                        3
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Activation du compte</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            Commencez à apprendre dès que nous validons votre inscription.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8">
                                <div className="flex items-start gap-4 bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <ShieldCheck className="w-10 h-10 text-purple-600 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-purple-900 text-lg mb-1">Activation Rapide</h4>
                                        <p className="text-purple-700">
                                            Votre compte sera activé immédiatement après vérification du reçu (généralement en moins de 30 minutes pendant les heures de travail). Vous recevrez une confirmation et aurez accès instantané à tous vos cours.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InscriptionPage;
