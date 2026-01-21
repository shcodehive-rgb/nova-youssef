"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const pricingPlans = [
    {
        name: "Débutant",
        price: "Gratuit",
        description: "Pour tester la plateforme",
        features: [
            "1 Cours",
            "30 Élèves max",
            "5 Go de stockage",
            "Commission 15%",
            "Support Email"
        ],
        cta: "Commencer gratuitement",
        href: "/sign-up",
        highlighted: false
    },
    {
        name: "Professeur",
        price: "199 DH",
        period: "/mois",
        description: "Pour les enseignants sérieux",
        features: [
            "5 Cours",
            "Élèves illimités",
            "100 Go de stockage",
            "0% Commission",
            "Support WhatsApp"
        ],
        cta: "Démarrer maintenant",
        href: "/sign-up",
        highlighted: true
    },
    {
        name: "Académie",
        price: "499 DH",
        period: "/mois",
        description: "Pour les centres de formation",
        features: [
            "Cours illimités",
            "Élèves illimités",
            "1 To de stockage",
            "White Label complet",
            "Support dédié"
        ],
        cta: "Nous contacter",
        href: "/contact",
        highlighted: false
    }
];

const comparisonData = [
    {
        category: "Général",
        features: [
            {
                name: "Nombre de cours",
                debutant: "1 Cours",
                professeur: "5 Cours",
                academie: "Illimité"
            },
            {
                name: "Nombre d'élèves",
                debutant: "30 Élèves",
                professeur: "Illimité",
                academie: "Illimité"
            },
            {
                name: "Stockage Vidéo",
                debutant: "5 Go",
                professeur: "100 Go",
                academie: "1 To"
            }
        ]
    },
    {
        category: "Monétisation",
        features: [
            {
                name: "Commission par vente",
                debutant: "15%",
                professeur: "0% (Tout pour vous)",
                academie: "0%"
            },
            {
                name: "Paiement CIH/Wafacash",
                debutant: true,
                professeur: true,
                academie: true
            }
        ]
    },
    {
        category: "Personnalisation",
        features: [
            {
                name: "Logo personnalisé",
                debutant: false,
                professeur: true,
                academie: true
            },
            {
                name: "Nom de Domaine (.com)",
                debutant: false,
                professeur: true,
                academie: true
            },
            {
                name: "White Label (Sans \"Nova\")",
                debutant: false,
                professeur: false,
                academie: true
            }
        ]
    },
    {
        category: "Support",
        features: [
            {
                name: "Support Technique",
                debutant: "Email",
                professeur: "WhatsApp",
                academie: "Dédié (Téléphone)"
            },
            {
                name: "Formation de départ",
                debutant: false,
                professeur: "Vidéo",
                academie: "Présentiel/Zoom"
            }
        ]
    }
];

const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
        return value ? (
            <Check className="h-5 w-5 text-green-600 mx-auto" />
        ) : (
            <X className="h-5 w-5 text-gray-300 mx-auto" />
        );
    }
    return <span className="text-slate-700">{value}</span>;
};

export default function TarifsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
            {/* Header */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                        Nos Tarifs et Fonctionnalités
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Choisissez le plan qui correspond à vos besoins. Tous les plans incluent les fonctionnalités essentielles.
                    </p>
                </div>
            </section>

            {/* Pricing Cards Summary */}
            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${plan.highlighted
                                    ? "border-orange-600 shadow-xl"
                                    : "border-slate-200"
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Populaire
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4">
                                        {plan.description}
                                    </p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold text-slate-900">
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-slate-600">{plan.period}</span>
                                        )}
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.href}>
                                    <Button
                                        className={`w-full ${plan.highlighted
                                            ? "bg-orange-600 hover:bg-orange-700 text-white"
                                            : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                                            }`}
                                        size="lg"
                                    >
                                        {plan.cta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
                            Comparatif Détaillé des Fonctionnalités
                        </h2>
                        <p className="text-lg text-slate-600">
                            Toutes les différences entre nos plans, en un coup d'œil
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="font-bold text-slate-900 text-lg">
                                        Fonctionnalité
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-slate-900 text-lg">
                                        Débutant
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-orange-600 text-lg bg-orange-50/30">
                                        Professeur
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-slate-900 text-lg">
                                        Académie
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comparisonData.map((category, categoryIndex) => (
                                    <Fragment key={categoryIndex}>
                                        <TableRow key={`category-${categoryIndex}`} className="bg-slate-100">
                                            <TableCell
                                                colSpan={4}
                                                className="font-bold text-slate-900 text-base py-4"
                                            >
                                                {category.category}
                                            </TableCell>
                                        </TableRow>
                                        {category.features.map((feature, featureIndex) => (
                                            <TableRow
                                                key={`feature-${categoryIndex}-${featureIndex}`}
                                                className="hover:bg-slate-50"
                                            >
                                                <TableCell className="font-medium text-slate-700">
                                                    {feature.name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderCell(feature.debutant)}
                                                </TableCell>
                                                <TableCell className="text-center bg-orange-50/10">
                                                    {renderCell(feature.professeur)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderCell(feature.academie)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center bg-orange-600 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à lancer votre plateforme ?
                    </h2>
                    <p className="text-xl mb-8 text-orange-100">
                        Commencez gratuitement, aucune carte bancaire requise
                    </p>
                    <Link href="/sign-up">
                        <Button
                            size="lg"
                            className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-6 text-lg"
                        >
                            Créer mon compte gratuitement
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
