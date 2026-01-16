"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
    subject: string;
}

const sampleLessons: Lesson[] = [
    {
        id: 1,
        title: "Introduction to Calculus - Limits Explained",
        duration: "12:45",
        thumbnail: "🎓",
        videoUrl: "#",
        subject: "Math"
    },
    {
        id: 2,
        title: "Newton's Laws of Motion - Complete Guide",
        duration: "15:30",
        thumbnail: "⚛️",
        videoUrl: "#",
        subject: "Physics"
    },
    {
        id: 3,
        title: "Derivatives & Applications - 2nd Bac",
        duration: "18:20",
        thumbnail: "📐",
        videoUrl: "#",
        subject: "Math"
    }
];

const VideoShowcase = () => {
    const [activeLesson, setActiveLesson] = useState<Lesson>(sampleLessons[0]);

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover Our <span className="text-gradient">Teaching Method</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience our unique approach to Math and Physics education through interactive video lessons
                    </p>
                </div>

                {/* Split View Container with Glassmorphism */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Featured Video Player - Left Side (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div
                            className="relative rounded-lg overflow-hidden group"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255, 107, 0, 0.3)',
                                boxShadow: '0 0 30px rgba(255, 107, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {/* Video Placeholder */}
                            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                {/* Placeholder for actual video */}
                                <div className="text-center space-y-4">
                                    <div className="text-8xl mb-4">{activeLesson.thumbnail}</div>
                                    <div
                                        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                                        style={{
                                            background: 'rgba(255, 107, 0, 0.9)',
                                            boxShadow: '0 0 20px rgba(255, 107, 0, 0.5)',
                                        }}
                                    >
                                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                    </div>
                                    <p className="text-white/80 text-sm">Click to play sample lesson</p>
                                </div>

                                {/* HTML5 Video Tag (hidden by default, can be shown when implemented) */}
                                <video
                                    className="absolute inset-0 w-full h-full object-cover hidden"
                                    controls
                                    poster="/placeholder-video.jpg"
                                >
                                    <source src={activeLesson.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Video Info Overlay */}
                            <div
                                className="p-6"
                                style={{
                                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                            {activeLesson.subject}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-1">
                                            {activeLesson.title}
                                        </h3>
                                    </div>
                                    <span className="text-white/80 text-sm font-medium">
                                        {activeLesson.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Playlist - Right Side (1/3 width) */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-xl font-bold mb-4 px-2">Sample Lessons</h3>

                        {sampleLessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className={`cursor-pointer rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] ${activeLesson.id === lesson.id
                                        ? 'ring-2 ring-primary'
                                        : ''
                                    }`}
                                style={{
                                    background: activeLesson.id === lesson.id
                                        ? 'rgba(255, 107, 0, 0.1)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: activeLesson.id === lesson.id
                                        ? '2px solid rgba(255, 107, 0, 0.5)'
                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: activeLesson.id === lesson.id
                                        ? '0 0 20px rgba(255, 107, 0, 0.3)'
                                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <div className="flex gap-3">
                                    {/* Thumbnail */}
                                    <div
                                        className="w-16 h-16 rounded-md flex items-center justify-center flex-shrink-0 text-2xl"
                                        style={{
                                            background: 'rgba(255, 107, 0, 0.1)',
                                        }}
                                    >
                                        {lesson.thumbnail}
                                    </div>

                                    {/* Lesson Info */}
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                            {lesson.subject}
                                        </span>
                                        <h4 className="text-sm font-semibold text-foreground line-clamp-2 mt-1">
                                            {lesson.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {lesson.duration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* CTA Button */}
                        <div
                            className="rounded-lg p-6 text-center mt-6"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.9), rgba(255, 107, 0, 0.7))',
                                boxShadow: '0 0 30px rgba(255, 107, 0, 0.3)',
                            }}
                        >
                            <h4 className="text-white font-bold text-lg mb-2">
                                Ready to Start Learning?
                            </h4>
                            <p className="text-white/90 text-sm mb-4">
                                Access 100+ premium lessons
                            </p>
                            <button className="w-full bg-white text-primary font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
                                Browse All Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
