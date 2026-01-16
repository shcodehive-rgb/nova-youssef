"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export interface CourseCardProps {
    id: string;
    title: string;
    instructorName: string;
    instructorAvatar?: string;
    // price: string; // HIDDEN
    imageUrl: string;
    category: string;
    isFree?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    title,
    instructorName,
    imageUrl,
    category,
    isFree = false,
}) => {
    return (
        <Link href={`/courses/${id}`} className="block group h-full">
            <div className="relative flex flex-col h-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-zinc-900/50 transition-all duration-300">

                {/* Full Width Image (Aspect Video) */}
                <div className="relative aspect-video w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                    {/* Category Badge - Overlay */}
                    <div className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {category}
                    </div>

                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                        {imageUrl ? (
                            <Image
                                fill
                                className="object-cover"
                                alt={title}
                                src={imageUrl}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-slate-400">
                                <span className="text-4xl filter grayscale opacity-50">🎬</span>
                            </div>
                        )}
                    </div>

                    {/* Lock Overlay */}
                    {!isFree && (
                        <div className="absolute bottom-2 right-2 z-20 p-1.5 bg-black/60 rounded-full text-white backdrop-blur-sm">
                            <Lock className="w-3 h-3" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        {instructorName}
                    </p>

                    {/* En savoir plus Button */}
                    <div className="w-full mt-4 border border-rose-500 text-rose-500 hover:bg-rose-50 rounded-md py-2 text-center transition font-semibold text-sm">
                        En savoir plus
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
