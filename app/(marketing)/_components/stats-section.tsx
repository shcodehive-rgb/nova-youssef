"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUpNumber } from "./count-up-number";

export const StatsSection = () => {
    const stats = [
        {
            value: 100,
            suffix: "%",
            label: "Marocain & Sécurisé",
            description: "Hébergement local et paiements sécurisés",
            animate: "count"
        },
        {
            value: 500,
            prefix: "+",
            label: "Heures de cours diffusées",
            description: "Des milliers d'élèves formés",
            animate: "count"
        },
        {
            display: "24/7",
            label: "Support technique local",
            description: "Une équipe à votre écoute",
            animate: "scale"
        }
    ];

    return (
        <section className="py-20 px-6 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {stats.map((stat, index) => (
                        <StatItem key={index} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatItem = ({ stat }: { stat: any }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="text-center">
            {stat.animate === "count" ? (
                <div className="text-5xl md:text-6xl font-bold text-orange-600 mb-3">
                    <CountUpNumber
                        end={stat.value}
                        prefix={stat.prefix || ""}
                        suffix={stat.suffix || ""}
                        duration={2.5}
                    />
                </div>
            ) : (
                <motion.div
                    className="text-5xl md:text-6xl font-bold text-orange-600 mb-3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
                        delay: 0.2
                    }}
                >
                    {stat.display}
                </motion.div>
            )}
            <div className="text-lg font-semibold text-slate-900 mb-2">
                {stat.label}
            </div>
            <div className="text-sm text-slate-500">
                {stat.description}
            </div>
        </div>
    );
};
