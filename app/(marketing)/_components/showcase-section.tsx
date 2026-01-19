"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ShowcaseItemProps {
    headline: string;
    text: string;
    imageUrl: string;
    imageAlt: string;
    imagePosition: "left" | "right";
}

const ShowcaseItem = ({ headline, text, imageUrl, imageAlt, imagePosition }: ShowcaseItemProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3, margin: "-100px" });

    const imageVariants = {
        hidden: {
            opacity: 0,
            x: imagePosition === "left" ? -100 : 100
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.2 }
        }
    };

    return (
        <div ref={ref} className="py-32">
            <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imagePosition === "right" ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <motion.div
                    className={imagePosition === "right" ? "lg:col-start-2" : ""}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={imageVariants}
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    className={imagePosition === "right" ? "lg:col-start-1 lg:row-start-1" : ""}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={textVariants}
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                        {headline}
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {text}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const showcaseItems = [
    {
        headline: "Votre site, votre image de marque.",
        text: "Utilisez notre éditeur simple pour personnaliser votre page d'accueil. Changez les couleurs, ajoutez votre logo et présentez-vous à vos élèves.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Landing Page Builder Interface",
        imagePosition: "left" as const
    },
    {
        headline: "Une expérience d'apprentissage fluide.",
        text: "Vos élèves adorent apprendre sur notre lecteur vidéo moderne. Chapitres clairs, téléchargements PDF et suivi de progression automatique.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Video Player Interface",
        imagePosition: "right" as const
    },
    {
        headline: "Partagez votre expertise gratuitement.",
        text: "Écrivez des articles de blog pour attirer plus d'élèves via Google (SEO). Pas besoin d'un site WordPress séparé.",
        imageUrl: "https://images.unsplash.com/photo-1499750310159-52f0f837ce62?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Blog Article Editor",
        imagePosition: "left" as const
    },
    {
        headline: "Pilotez votre business en toute sérénité.",
        text: "Connectez votre banque (CIH/Wafacash) et suivez vos revenus en temps réel depuis votre tableau de bord.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Settings & Payments Dashboard",
        imagePosition: "right" as const
    }
];

export const ShowcaseSection = () => {
    return (
        <section className="bg-white">
            <div className="divide-y divide-slate-100">
                {showcaseItems.map((item, index) => (
                    <ShowcaseItem
                        key={index}
                        headline={item.headline}
                        text={item.text}
                        imageUrl={item.imageUrl}
                        imageAlt={item.imageAlt}
                        imagePosition={item.imagePosition}
                    />
                ))}
            </div>
        </section>
    );
};
