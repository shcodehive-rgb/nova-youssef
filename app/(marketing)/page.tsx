"use client";

import React from 'react';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PricingSection from '@/components/PricingSection';
import HeroSection from '@/components/HeroSection';

// Sample Data with the requested Moroccan context
const courses = [
    {
        id: "2bac-sm-analyse",
        title: "2 Bac SM - Analyse (Calculus Mastery)",
        instructorName: "Prof. Alami",
        price: "399 MAD",
        category: "Math",
        imageUrl: "/placeholder-math.jpg", // in a real app, these would be real public paths
    },
    {
        id: "univ-s1-mechanics",
        title: "Mechanics & Newton's Laws (University S1)",
        instructorName: "Dr. Bennani",
        price: "299 MAD",
        category: "Physics",
        imageUrl: "/placeholder-physics.jpg",
    },
    {
        id: "concours-ensa-ensam",
        title: "Preparation for ENSA/ENSAM Concours",
        instructorName: "Prof. Alami",
        price: "599 MAD",
        category: "Concours",
        imageUrl: "/placeholder-concours.jpg",
    },
    {
        id: "limits-continuity",
        title: "Limits & Continuity - Free Starter",
        instructorName: "Prof. Alami",
        price: "Free",
        category: "Math",
        imageUrl: "/placeholder-free.jpg",
    },
];

export default function Home() {
    return (
        <div className="bg-white min-h-screen pb-20">


            {/* Section 1: 3D Hero Section */}
            <HeroSection />

            {/* Section 2: Course Grid */}
            <section id="featured-courses" className="py-16 px-6 max-w-7xl mx-auto">
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
                    <Link href="/lessons" className="text-sm font-medium text-gray-500 hover:text-primary hidden md:block">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            {...course}
                        />
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link href="/lessons" className="text-sm font-medium text-gray-500 hover:text-primary">
                        View All Courses →
                    </Link>
                </div>
            </section>

            {/* Section 3: Pricing */}
            <PricingSection />

        </div>
    );
}
