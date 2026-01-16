import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { BookOpen } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';

export default async function LearnPage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect('/sign-in');
    }

    // Fetch courses that the user has purchased
    const enrolledCourses = await db.course.findMany({
        where: {
            purchases: {
                some: {
                    userId: userId,
                },
            },
            isPublished: true,
        },
        include: {
            chapters: {
                orderBy: {
                    position: 'asc',
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Learning</h1>
                    <p className="text-gray-500 dark:text-gray-400">Continue where you left off.</p>
                </div>
            </div>

            {/* Enrolled Courses or Empty State */}
            {enrolledCourses.length === 0 ? (
                // Empty State with Browse Courses Button
                <div className="p-12 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
                    <div className="text-6xl mb-2">📚</div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Your courses will appear here
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                            Start learning today by enrolling in courses that match your interests and goals.
                        </p>
                    </div>
                    <Link href="/lessons">
                        <Button className="mt-4">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Browse Courses
                        </Button>
                    </Link>
                </div>
            ) : (
                // Enrolled Courses Grid
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'} enrolled
                        </p>
                        <Link href="/lessons">
                            <Button variant="outline" size="sm">
                                Browse More Courses
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {enrolledCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                instructorName="Prof. Youssef" // TODO: Add instructor field to database

                                imageUrl={course.imageUrl || '/placeholder-course.jpg'}
                                category={course.categoryId || 'General'}
                                isFree={true} // User has already purchased, so it's "free" for them
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
