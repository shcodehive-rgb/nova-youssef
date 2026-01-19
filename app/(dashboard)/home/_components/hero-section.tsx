"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HeroSection = ({
    title = "Master Math & Physics",
    description = "Join Morocco's elite students and master your subjects with the best teachers."
}: {
    title?: string | null,
    description?: string | null
}) => {

    // Generate a dense cloud of symbols
    const symbolSet = ['π', '∑', '∫', '√', '∞', '≈', '≠', '±', '×', '÷', 'α', 'β', 'Ω', 'θ', 'λ', 'µ', '∆', 'x', 'y', 'z', 'أ', 'ب', 'ج', 'د', 'س', 'ص', 'ع', 'م', 'ن'];

    // State to hold symbols (client-side only to prevent hydration mismatch)
    const [cloudSymbols, setCloudSymbols] = useState<any[]>([]);

    useEffect(() => {
        const generateCloud = (count: number) => {
            return Array.from({ length: count }).map((_, i) => ({
                id: i,
                char: symbolSet[i % symbolSet.length],
                color: i % 3 === 0 ? 'text-orange-500/80' : i % 3 === 1 ? 'text-slate-800/80' : 'text-slate-200',
                size: i % 4 === 0 ? 'text-6xl' : i % 3 === 0 ? 'text-4xl' : 'text-2xl',
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                rotate: `${Math.random() * 60 - 30}deg`,
                delay: Math.random() * 2,
                duration: 3 + Math.random() * 3
            }));
        };

        setCloudSymbols(generateCloud(30));
    }, []);

    const floatAnimation: any = {
        initial: { y: 0, opacity: 0 },
        animate: (custom: any) => ({
            y: [0, -20, 0],
            opacity: 1,
            transition: {
                y: {
                    duration: custom.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: custom.delay
                },
                opacity: { duration: 0.5 }
            }
        })
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-0 pb-12 overflow-hidden">
            {/* Left Side: Text & Buttons */}
            <div className="space-y-8 z-10 relative">
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                    {title}
                </h1>

                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/inscription">
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 h-14 text-lg w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all">
                            Comment s'inscrire
                        </Button>
                    </Link>
                    <Link href="/search">
                        <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-8 h-14 text-lg w-full sm:w-auto gap-2">
                            <Search className="h-5 w-5" />
                            Voir les cours
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right Side: Floating Symbols Cloud */}
            <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-1000">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-orange-100/40 to-slate-100/40 rounded-full blur-3xl -z-10" />

                <div className="relative w-full h-full">
                    {cloudSymbols.map((item) => (
                        <motion.div
                            key={item.id}
                            custom={item}
                            variants={floatAnimation}
                            initial="initial"
                            animate="animate"
                            whileHover={{ scale: 1.2, rotate: 10, transition: { duration: 0.2 } }}
                            className={`absolute font-bold select-none cursor-pointer ${item.size} ${item.color} hover:text-orange-600 transition-colors duration-300`}
                            style={{
                                top: item.top,
                                left: item.left,
                                rotate: item.rotate
                            }}
                        >
                            {item.char}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
