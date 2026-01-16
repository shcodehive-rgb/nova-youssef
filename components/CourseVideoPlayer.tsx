"use client";

import React, { useState } from 'react';
import { Lock, Play, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface Chapter {
    id: string;
    title: string;
    videoUrl: string;
    duration: string;
    isFreePreview: boolean;
}

interface CourseVideoPlayerProps {
    chapter: Chapter;
    courseName: string;
    coursePrice: string;
    hasPurchased: boolean;
    onPurchaseClick?: () => void;
}

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({
    chapter,
    courseName,
    coursePrice,
    hasPurchased,
    onPurchaseClick
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Determine if the user can access this chapter
    const canAccessChapter = chapter.isFreePreview || hasPurchased;

    // Handle play button click
    const handlePlayClick = () => {
        if (canAccessChapter) {
            setIsPlaying(true);
        }
    };

    return (
        <div className="relative w-full">
            {/* Video Container */}
            <div
                className="relative aspect-video rounded-lg overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))',
                }}
            >
                {canAccessChapter ? (
                    // User can access - Show video player
                    <>
                        {!isPlaying ? (
                            // Video Thumbnail with Play Button
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-black">
                                <div className="text-center space-y-4">
                                    <div
                                        onClick={handlePlayClick}
                                        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                                        style={{
                                            background: 'rgba(255, 107, 0, 0.9)',
                                            boxShadow: '0 0 40px rgba(255, 107, 0, 0.6)',
                                        }}
                                    >
                                        <Play className="w-12 h-12 text-white ml-2" fill="white" />
                                    </div>
                                    <div className="text-white">
                                        <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
                                        <p className="text-white/70 text-sm">{chapter.duration}</p>
                                        {chapter.isFreePreview && (
                                            <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                                                Free Preview
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Actual Video Player
                            <video
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source src={chapter.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </>
                ) : (
                    // User cannot access - Show Locked Overlay
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85))',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div className="text-center space-y-6 px-6 max-w-md">
                            {/* Lock Icon */}
                            <div
                                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
                                style={{
                                    background: 'rgba(255, 107, 0, 0.1)',
                                    border: '2px solid rgba(255, 107, 0, 0.3)',
                                }}
                            >
                                <Lock className="w-12 h-12 text-primary" />
                            </div>

                            {/* Locked Content Message */}
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-white">
                                    Locked Content
                                </h3>
                                <p className="text-white/80 text-base">
                                    This chapter is part of the premium course content.
                                </p>
                                <p className="text-white/60 text-sm">
                                    Purchase <span className="text-primary font-semibold">{courseName}</span> to unlock all lessons and resources.
                                </p>
                            </div>

                            {/* Chapter Info */}
                            <div
                                className="p-4 rounded-lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <p className="text-white/90 font-medium">{chapter.title}</p>
                                <p className="text-white/60 text-sm mt-1">{chapter.duration}</p>
                            </div>

                            {/* Purchase Button */}
                            <Button
                                size="lg"
                                onClick={onPurchaseClick}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg shadow-lg"
                                style={{
                                    boxShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                                }}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Buy Course to Unlock - {coursePrice}
                            </Button>

                            {/* Additional Info */}
                            <p className="text-white/50 text-xs">
                                Get lifetime access to all course materials
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Info Bar (Below Video) */}
            <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-foreground">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                            Duration: {chapter.duration}
                            {chapter.isFreePreview && (
                                <span className="ml-3 text-green-600 font-semibold">• Free Preview</span>
                            )}
                            {!chapter.isFreePreview && hasPurchased && (
                                <span className="ml-3 text-primary font-semibold">• Premium Content</span>
                            )}
                        </p>
                    </div>
                    {!canAccessChapter && (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseVideoPlayer;
