"use client";

import Image from "next/image";
import { useState } from "react";
import { Attachment, Chapter, Course, UserProgress, Purchase } from "@prisma/client";
import {
    FileText,
    MessageSquare,
    MonitorPlay,
    Download,
    File,
    File,
    ChevronRight,
    ArrowLeft,
    ArrowRight
} from "lucide-react";

import { VideoPlayer } from "@/components/video-player";
import { Banner } from "@/components/banner"; // Assuming this exists or we'll simple-div it
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChapterViewProps {
    chapter: Chapter;
    course: Course;
    attachments: Attachment[];
    nextChapter: Chapter | null;
    previousChapter: Chapter | null;
    userProgress: UserProgress | null;
    purchase: Purchase | null;
    completeOnEnd: boolean;
};

export const ChapterView = ({
    chapter,
    course,
    attachments,
    nextChapter,
    previousChapter,
    userProgress,
    purchase,
    completeOnEnd
}: ChapterViewProps) => {
    const [activeTab, setActiveTab] = useState<"cours" | "attachments" | "discuss">("cours");

    const isLocked = !chapter.isFree && !purchase;

    return (
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
            {/* 1. Video Player Section (Full Width) */}
            <div className="p-4">
                {userProgress?.isCompleted && (
                    <Banner
                        variant="success"
                        label="You already completed this chapter."
                    />
                )}
                {isLocked && (
                    <Banner
                        variant="warning"
                        label="You need to purchase this course to watch this chapter."
                    />
                )}

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-md">
                    <VideoPlayer
                        chapterId={chapter.id}
                        title={chapter.title}
                        courseId={course.id}
                        nextChapterId={nextChapter?.id}
                        playbackId={undefined}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        videoUrl={chapter.videoUrl!}
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between px-4 mb-4">
                {previousChapter ? (
                    <Link href={`/courses/${course.id}/chapters/${previousChapter.id}`} className="w-full md:w-auto">
                        <Button variant="outline" className="w-full md:w-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Précédent
                        </Button>
                    </Link>
                ) : (
                    <div /> // Spacer
                )}
                {nextChapter ? (
                    <Link href={`/courses/${course.id}/chapters/${nextChapter.id}`} className="w-full md:w-auto">
                        <Button className="w-full md:w-auto">
                            Suivant
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <div /> // Spacer
                )}
            </div>

            {/* 2. Tabs System */}
            <div className="mt-4 px-4">
                <div className="flex items-center gap-x-4 border-b border-gray-200 dark:border-zinc-800">
                    <button
                        type="button"
                        onClick={() => setActiveTab("cours")}
                        className={`flex items-center gap-2 pb-3 px-2 text-sm font-medium transition-all border-b-2 ${activeTab === "cours"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <MonitorPlay className="w-4 h-4" />
                        Cours & Schéma
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("attachments")}
                        className={`flex items-center gap-2 pb-3 px-2 text-sm font-medium transition-all border-b-2 ${activeTab === "attachments"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Ressources & Pièces Jointes
                        {attachments.length > 0 && (
                            <span className="ml-1 bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-full text-xs">
                                {attachments.length}
                            </span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("discuss")}
                        className={`flex items-center gap-2 pb-3 px-2 text-sm font-medium transition-all border-b-2 ${activeTab === "discuss"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Discussion ({0})
                    </button>
                </div>
            </div>

            {/* 3. Tab Content */}
            <div className="mt-6 px-4">

                {/* TAB A: Cours & Schéma */}
                {activeTab === "cours" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {chapter.title}
                            </h2>
                            <Separator />
                        </div>

                        {/* Description / Preview */}
                        <div>
                            <Preview value={chapter.description || "<p>No description available.</p>"} />
                        </div>

                        {/* Schéma Image Logic */}
                        {chapter.imageUrl && (
                            <div className="mt-8 border-t pt-8">
                                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Capture D&apos;écran</h3>
                                <div className="relative w-64 aspect-video rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:opacity-90 cursor-pointer transition">
                                    <a href={chapter.imageUrl!} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                        <Image
                                            src={chapter.imageUrl!}
                                            alt={chapter.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB B: Documents */}
                {activeTab === "attachments" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Ressources & Pièces Jointes</h3>
                            <p className="text-xs text-muted-foreground">{attachments.length} fichiers</p>
                        </div>

                        {attachments.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 text-sm">
                                Aucun document disponible pour ce chapitre.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {attachments.map((file) => (
                                    <div key={file.id} className="relative aspect-square cursor-pointer overflow-hidden rounded-md border hover:opacity-75 group bg-slate-100 dark:bg-zinc-800">
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="relative w-full h-full block">
                                            <Image
                                                src={file.url}
                                                alt={file.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 w-full bg-black/60 p-2">
                                                <p className="text-white text-xs truncate">
                                                    {file.name}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB C: Discussion */}
                {activeTab === "discuss" && (
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-zinc-900/50 rounded-lg">
                        <MessageSquare className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Discussion Forum</h3>
                        <p className="text-slate-500 text-sm mb-4">Questions and Answers for this lesson.</p>
                        <Button variant="outline" disabled>
                            Coming Soon
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};
