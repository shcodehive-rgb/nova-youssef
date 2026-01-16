import React from 'react';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Play, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PaymentModal } from '@/components/PaymentModal';

interface PageProps {
    params: Promise<{
        courseId: string;
    }>;
    searchParams: Promise<{
        chapterId?: string;
    }>;
}

// Mock User ID for development (since we haven't fully set up Auth UI)
const MOCK_USER_ID = "guest-user-123";

export default async function CoursePlayerPage({ params, searchParams }: PageProps) {
    const { courseId } = await params;
    const { chapterId } = await searchParams;

    // 1. Fetch Course & Chapters
    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            chapters: {
                orderBy: { position: 'asc' },
            },
        },
    });

    if (!course) {
        return <div>Course not found</div>;
    }

    // 2. Select Active Chapter
    // Default to first chapter if none selected
    const activeChapterId = chapterId || course.chapters[0]?.id;
    const activeChapter = course.chapters.find(c => c.id === activeChapterId);

    if (!activeChapter) {
        return <div>No chapters found</div>;
    }

    // 3. Check for Purchase
    // In a real app, use: const session = await auth(); const userId = session?.user?.id;
    // For now, let's assume NO purchase unless we explicitly create one via admin
    // So everyone sees the Lock screen unless chapter.isFree is true.
    // To test "Unlocked" state, we'd need a real user in DB. 
    // Let's do a safe check:
    const purchase = await db.purchase.findFirst({
        where: {
            courseId: courseId,
            // userId: userId // Uncomment when Auth is ready
            userId: "TEMP_FIXED_USER_ID" // We'll need to create a user with this ID to test unlock
        }
    });

    const isLocked = !activeChapter.isFree && !purchase;

    return (
        <div className="flex h-[calc(100vh-80px)]">

            {/* Sidebar: Chapter List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50 overflow-y-auto hidden md:block">
                <div className="p-4 border-b border-gray-200 bg-white">
                    <h2 className="font-semibold text-slate-900 truncate">{course.title}</h2>
                </div>
                <div className="flex flex-col">
                    {course.chapters.map((chapter) => (
                        <Link
                            key={chapter.id}
                            href={`/learn/${courseId}?chapterId=${chapter.id}`}
                            className={`flex items-center gap-3 p-4 text-sm transition-colors hover:bg-gray-100 ${chapter.id === activeChapterId ? "bg-orange-50 text-orange-700 border-r-2 border-orange-600" : "text-slate-600"}`}
                        >
                            {chapter.isFree || purchase ? (
                                <Play className="w-4 h-4" />
                            ) : (
                                <Lock className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="line-clamp-1">{chapter.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content: Video Player */}
            <div className="flex-1 flex flex-col overflow-y-auto">

                <div className="flex-1 flex items-center justify-center bg-zinc-950 relative min-h-[400px]">
                    {isLocked ? (
                        <div className="text-center space-y-6 max-w-md p-6">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">This Chapter is Locked 🔒</h2>
                                <p className="text-zinc-400">
                                    Purchase the full course to unlock this chapter and all other premium content.
                                </p>
                            </div>
                            {/* Manual Payment Modal */}
                            <PaymentModal courseTitle={course.title} price={course.price || 300} />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            {/* Placeholder for Video Player */}
                            <div className="text-center text-white">
                                <iframe
                                    src={activeChapter.videoUrl || ""}
                                    className="w-full aspect-video max-w-4xl shadow-2xl"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 max-w-4xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">{activeChapter.title}</h1>
                        {/* Navigation buttons could go here */}
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-500">
                            {activeChapter.isFree ? "Default description for free preview." : "Premium content description."}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}
