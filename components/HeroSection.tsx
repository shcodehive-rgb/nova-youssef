"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Search } from 'lucide-react';

const SYMBOLS = ['π', '∫', '∑', '⚛', 'Ω', '√', 'λ', 'x²', '∆', 'µ', '∞', '≈', 'α', 'β'];

// Generate symbols restricted to the right side
const generateSymbols = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const depth = Math.random();
        // Randomize color palette
        let color = 'text-gray-200'; // Default Accent
        const rand = Math.random();
        if (rand > 0.7) color = 'text-orange-600'; // Primary
        else if (rand > 0.4) color = 'text-slate-800'; // Secondary

        return {
            id: i,
            char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            top: Math.random() * 80 + 10, // 10% - 90% vertical
            left: Math.random() * 90 + 5, // 5% - 95% relative to the RIGHT container
            depth: depth,
            size: Math.floor(depth * 40 + 20), // 20px - 60px
            blur: depth < 0.2 ? 'blur-[1px]' : 'blur-none',
            opacity: depth < 0.3 ? 0.5 : 1,
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 2,
            color: color,
            rotationSpeed: Math.random() * 10 + 10,
        };
    });
};

const ExplodingSymbol = ({ symbol }: { symbol: any }) => {
    const [isExploded, setIsExploded] = useState(false);
    const [key, setKey] = useState(0); // To force re-render/respawn

    const handleClick = () => {
        setIsExploded(true);
        setTimeout(() => {
            setIsExploded(false);
            setKey(prev => prev + 1); // Respawn
        }, 1500);
    };

    return (
        <AnimatePresence>
            {!isExploded && (
                <motion.div
                    key={key}
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{
                        scale: 1,
                        opacity: symbol.opacity,
                        y: [0, -30, 0],
                        rotateX: [0, 20, 0],
                        rotateY: [0, 20, 0],
                        rotateZ: [0, 10, -10, 0]
                    }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{
                        scale: { duration: 0.5 },
                        opacity: { duration: 0.5 },
                        y: { duration: symbol.duration, repeat: Infinity, ease: "easeInOut" },
                        rotateX: { duration: symbol.duration * 1.2, repeat: Infinity },
                        rotateY: { duration: symbol.duration * 1.5, repeat: Infinity },
                        rotateZ: { duration: symbol.rotationSpeed, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute select-none cursor-pointer font-serif font-bold ${symbol.blur} ${symbol.color} hover:text-orange-500 transition-colors`}
                    style={{
                        top: `${symbol.top}%`,
                        left: `${symbol.left}%`,
                        fontSize: `${symbol.size}px`,
                        zIndex: 10,
                    }}
                    onClick={handleClick}
                    whileHover={{ scale: 1.2 }}
                >
                    {symbol.char}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const HeroSection = () => {
    const [symbols, setSymbols] = useState<any[]>([]);

    useEffect(() => {
        setSymbols(generateSymbols(25));
    }, []);

    return (
        <section className="relative w-full min-h-[85vh] lg:h-[90vh] bg-white overflow-hidden flex items-center">

            {/* Right Side Background Blob (Subtle) */}
            <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-orange-50/50 rounded-full blur-3xl -z-0" />

            <div className="container mx-auto px-6 h-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Clean Content */}
                <div className="z-20 space-y-6 pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Master <br />
                            Math & Physics
                        </h1>
                        <p className="text-xl text-slate-600 mt-6 leading-relaxed font-medium">
                            Join Morocco's elite students. Experience a learning platform that combines academic rigor with interactive engagement.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href="/inscription">
                                <Button size="lg" className="h-14 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg shadow-lg shadow-orange-200">
                                    Comment s'inscrire
                                </Button>
                            </Link>
                            <Link href="/search">
                                <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                    <Search className="w-5 h-5 mr-2" />
                                    Voir les cours
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Floating Math Universe */}
                <div className="h-[50vh] lg:h-full relative z-10 w-full">
                    {/* Container for symbols - strictly constrained to this grid column */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {symbols.map((s) => (
                            <ExplodingSymbol key={s.id} symbol={s} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
