"use client";

import { PricingPlan } from "@prisma/client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
    plans: PricingPlan[];
}

export const PricingSection = ({ plans }: PricingSectionProps) => {
    if (!plans || plans.length === 0) return null;

    return (
        <div className="py-10 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Nos Offres & Packs
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative flex flex-col bg-white rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:shadow-xl",
                                plan.isRecommended ? "border-orange-500 ring-4 ring-orange-500/10 scale-105 z-10" : "border-slate-200"
                            )}
                        >
                            {plan.isRecommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                                    RECOMMANDÉ
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                    <span className="text-xl font-bold text-slate-900 ml-1">DH</span>
                                    <span className="text-slate-500 ml-2">/ {plan.frequency}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.split("\n").map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 mr-3">
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-600 font-medium">{feature.replace(/^- /, "")}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.url || "/contact"}
                                className="w-full"
                                target={plan.url?.startsWith("http") ? "_blank" : "_self"}
                            >
                                <Button
                                    className={cn(
                                        "w-full h-12 rounded-xl text-base font-bold transition-transform active:scale-95",
                                        plan.isRecommended
                                            ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/25"
                                            : "bg-slate-900 hover:bg-slate-800 text-white"
                                    )}
                                >
                                    {plan.url ? "S'inscrire" : "Nous contacter"}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
