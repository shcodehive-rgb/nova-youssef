import React from 'react';
import { db } from '@/lib/db';
import CourseCard from '@/components/CourseCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SearchInput } from '@/components/search-input';

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ categoryId?: string; title?: string }>
}) {
    // 1. Fetch Categories for the Pill List
    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    const { categoryId, title } = await searchParams;

    // 2. Fetch Courses (Filtered by Category and Title)
    const courses = await db.course.findMany({
        where: {
            isPublished: true,
            categoryId: categoryId ? categoryId : undefined,
            title: {
                contains: title,
                mode: "insensitive",
            },
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="p-6 space-y-6">

            {/* 1. Search Bar */}
            <div className="w-full max-w-3xl mx-auto">
                <SearchInput />
            </div>

            {/* 2. Categories Pills */}
            <div className="w-full">
                <ScrollArea className="w-full whitespace-nowrap rounded-md border-none">
                    <div className="flex w-max space-x-3 pb-4 px-1">
                        {/* 'Tout' (All) Button */}
                        <a
                            href="/search"
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border ${!categoryId
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            Tout
                        </a>

                        {categories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`/search?categoryId=${cat.id}`}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border ${categoryId === cat.id
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </div>

            {/* 3. The Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {categoryId ? categories.find(c => c.id === categoryId)?.name : "Tous les cours"}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {courses.length} {courses.length === 1 ? 'Cours' : 'Cours'}
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <div className="text-5xl mb-4">📭</div>
                        <p className="text-slate-500 font-medium">Aucun cours trouvé dans cette catégorie.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                teacherName={course.teacherName || "Enseignant"}
                                imageUrl={course.imageUrl || ''}
                                category={course.category?.name || 'Général'}
                                isFree={!course.price || course.price === 0}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
