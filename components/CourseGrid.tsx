"use client";

import React from 'react';
import { Button } from './ui/button';

interface Course {
    id: number;
    title: string;
    category: string;
    price: string;
    instructor?: string;
    tags: string[];
    image?: string;
}

const courses: Course[] = [
    {
        id: 1,
        title: "2nd Bac SM/PC - Calculus Mastery",
        category: "Math",
        price: "399 MAD",
        instructor: "Prof. Alami",
        tags: ["Premium"],
    },
    {
        id: 2,
        title: "Mechanics & Newton's Laws (University S1)",
        category: "Physics",
        price: "299 MAD",
        instructor: "Dr. Bennani",
        tags: ["Premium"],
    },
    {
        id: 3,
        title: "Preparation for ENSA/ENSAM Concours",
        category: "Concours",
        price: "599 MAD",
        instructor: "Prof. Alami",
        tags: ["Best Seller"],
    },
    {
        id: 4,
        title: "Limits & Continuity - Free Starter",
        category: "Math",
        price: "Free",
        instructor: "Prof. Alami",
        tags: ["Free"],
    },
];

const CourseGrid = () => {
    return (
        <section className="py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient">Courses</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Master Math and Physics with our expert-led courses designed for Moroccan students
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group bg-card border border-border rounded-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Course Image Placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <div className="text-6xl opacity-20">
                                    {course.category === "Math" ? "∫" : course.category === "Physics" ? "⚛" : "🎯"}
                                </div>

                                {/* Tags */}
                                <div className="absolute top-3 right-3">
                                    {course.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-3 py-1 text-xs font-semibold rounded-sm ${tag === "Premium"
                                                    ? "bg-primary text-white"
                                                    : tag === "Best Seller"
                                                        ? "bg-yellow-500 text-black"
                                                        : "bg-green-500 text-white"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="p-5 space-y-3">
                                <div className="text-sm font-medium text-primary uppercase tracking-wide">
                                    {course.category}
                                </div>

                                <h3 className="text-lg font-bold text-foreground line-clamp-2 min-h-[3.5rem]">
                                    {course.title}
                                </h3>

                                {course.instructor && (
                                    <p className="text-sm text-muted-foreground">
                                        By {course.instructor}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                    <span className="text-2xl font-bold text-foreground">
                                        {course.price}
                                    </span>
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        Enroll
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        View All Courses
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CourseGrid;
