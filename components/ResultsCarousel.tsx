"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

interface ResultsCarouselProps {
    images: string[];
}

export const ResultsCarousel = ({ images }: ResultsCarouselProps) => {
    // If fewer than 5 images, duplicate them to ensure smooth loop
    const displayImages = images.length < 5 ? [...images, ...images, ...images, ...images] : [...images, ...images];

    if (images.length === 0) return null;

    return (
        <div className="py-20 bg-white overflow-hidden border-t">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Ils ont réussi avec Nova Academy
                </h2>
                <p className="text-slate-500 mt-4">
                    Rejoignez des centaines d'étudiants qui ont excellé dans leurs études.
                </p>
            </div>

            <div className="relative w-full flex">
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 px-6"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: displayImages.length * 5 // Adjust speed based on count
                        }}
                    >
                        {displayImages.map((src, idx) => (
                            <div
                                key={idx}
                                className="relative flex-shrink-0 w-[200px] md:w-[220px] aspect-[3/4] rounded-xl overflow-hidden border shadow-sm select-none"
                            >
                                <Image
                                    src={src}
                                    alt={`Résultat ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
