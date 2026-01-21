"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ShowcaseItemProps {
    headline: string;
    text: string;
    imageUrl: string;
    imageAlt: string;
    imagePosition: "left" | "right";
    link: string;
    linkText: string;
}

const ShowcaseItem = ({ headline, text, imageUrl, imageAlt, imagePosition, link, linkText }: ShowcaseItemProps) => {
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
                    <div className="relative">
                        {imageUrl.startsWith('/') ? (
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-xl shadow-2xl border border-gray-100"
                            />
                        ) : (
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-auto rounded-xl shadow-2xl border border-gray-100"
                            />
                        )}
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
                    <p className="text-xl text-slate-600 leading-relaxed mb-6">
                        {text}
                    </p>

                    {/* Call to Action Link */}
                    <Link
                        href={link}
                        className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg hover:underline transition-colors"
                    >
                        {linkText}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

const showcaseItems = [
    {
        headline: "Votre Vitrine Professionnelle",
        text: "Ne vous contentez plus d'un simple groupe WhatsApp. Offrez aux parents et élèves une interface moderne qui inspire confiance. Affichez vos résultats du Bac, présentez vos packs de prix et permettez aux élèves de vous contacter directement via un bouton WhatsApp intégré. C'est votre école, à votre image.",
        imageUrl: "/feat-home.jpg",
        imageAlt: "Page d'accueil professionnelle avec résultats et tarifs",
        imagePosition: "left" as const,
        link: "/features/vitrine",
        linkText: "En savoir plus sur la personnalisation ➝"
    },
    {
        headline: "Une Organisation Sans Faille",
        text: "Fini le chaos des fichiers perdus dans les conversations. Vos cours sont désormais structurés logiquement : Matière > Module > Chapitre. Grâce aux filtres intelligents, vos élèves trouvent la bonne leçon et le bon exercice en moins de 2 secondes. Vous gagnez du temps, eux aussi.",
        imageUrl: "/feat-catalog.jpg",
        imageAlt: "Catalogue de cours organisé par matière et module",
        imagePosition: "right" as const,
        link: "/features/organization",
        linkText: "Voir l'organisation ➝"
    },
    {
        headline: "Monétisez en Toute Sécurité",
        text: "Gardez le contrôle total sur votre contenu. Notre système de cadenas intelligent vous permet d'offrir le premier chapitre gratuitement pour convaincre, puis de verrouiller automatiquement la suite. Dès que l'élève paie (CIH/Wafacash), le contenu se débloque instantanément sans votre intervention.",
        imageUrl: "/feat-player.jpg",
        imageAlt: "Lecteur vidéo avec système de verrouillage",
        imagePosition: "left" as const,
        link: "/features/monetization",
        linkText: "Découvrir la sécurité ➝"
    },
    {
        headline: "Attirez des Élèves Gratuitement",
        text: "Pourquoi payer de la publicité quand Google peut travailler pour vous ? Utilisez votre blog intégré pour publier des conseils et des résumés. Cela améliore votre référencement (SEO) et attire de nouveaux élèves qui cherchent des cours de soutien dans votre ville, le tout gratuitement.",
        imageUrl: "/feat-blog.jpg",
        imageAlt: "Interface de blog intégré pour le SEO",
        imagePosition: "right" as const,
        link: "/features/seo",
        linkText: "Voir les outils marketing ➝"
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
                        link={item.link}
                        linkText={item.linkText}
                    />
                ))}
            </div>
        </section>
    );
};
