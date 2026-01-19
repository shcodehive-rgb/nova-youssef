"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
    autoPlayInterval?: number; // in milliseconds
}

export const HeroCarousel = ({ autoPlayInterval = 4000 }: HeroCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Placeholder slides - will be replaced with actual images
    const slides = [
        {
            id: 1,
            title: "Créez vos cours",
            description: "Interface intuitive pour créer du contenu",
            bgColor: "from-orange-100 to-orange-50"
        },
        {
            id: 2,
            title: "Gérez vos élèves",
            description: "Tableau de bord complet",
            bgColor: "from-blue-100 to-blue-50"
        },
        {
            id: 3,
            title: "Encaissez facilement",
            description: "Paiements CIH & Wafacash intégrés",
            bgColor: "from-purple-100 to-purple-50"
        }
    ];

    const totalSlides = slides.length;

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlayInterval, totalSlides]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    return (
        <div className="relative group">
            {/* Carousel Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Slides */}
                <div className="relative aspect-video">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                index === currentSlide ? "opacity-100" : "opacity-0"
                            )}
                        >
                            <div className={cn(
                                "w-full h-full bg-gradient-to-br rounded-lg flex items-center justify-center p-8",
                                slide.bgColor
                            )}>
                                <div className="text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                        {slide.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm md:text-base">
                                        {slide.description}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-4">
                                        Image placeholder - Slide {slide.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows - Hidden on mobile, visible on hover on desktop */}
                <button
                    onClick={goToPrevious}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={goToNext}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            index === currentSlide
                                ? "w-8 bg-orange-600"
                                : "w-2 bg-slate-300 hover:bg-slate-400"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Decorative blur effect */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-orange-600/20 blur-3xl -z-10 rounded-full"></div>
        </div>
    );
};
