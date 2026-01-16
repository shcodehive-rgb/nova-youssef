"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createCourse, addChapter, publishCourse } from "@/actions/courses";
import { grantAccess } from "@/actions/admin";
import { useTransition } from "react";
import { Loader2, Plus, Upload, CheckCircle, Video } from "lucide-react";

export default function AdminDashboard() {
    const [isPending, startTransition] = useTransition();
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

    // Forms State
    const [courseTitle, setCourseTitle] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [isFree, setIsFree] = useState(false);
    const [studentEmail, setStudentEmail] = useState("");

    // Quick feedback state
    const [message, setMessage] = useState("");

    const handleCreateCourse = () => {
        if (!courseTitle) return;
        startTransition(async () => {
            try {
                const course = await createCourse(courseTitle);
                setActiveCourseId(course.id);
                setMessage(`Course "${course.title}" created! Add chapters below.`);
                setCourseTitle("");
            } catch (e) {
                setMessage("Error creating course");
            }
        });
    };

    const handleAddChapter = () => {
        if (!activeCourseId || !chapterTitle) return;
        startTransition(async () => {
            try {
                await addChapter(activeCourseId, chapterTitle, videoUrl, isFree);
                setMessage("Chapter added successfully!");
                setChapterTitle("");
                setVideoUrl("");
                setIsFree(false);
            } catch (e) {
                setMessage("Error adding chapter");
            }
        });
    };

    const handlePublish = () => {
        if (!activeCourseId) return;
        startTransition(async () => {
            try {
                await publishCourse(activeCourseId);
                setMessage("Course Published Live!");
            } catch (e) {
                setMessage("Error publishing course");
            }
        });
    };

    const handleGrantAccess = () => {
        if (!activeCourseId || !studentEmail) return;
        startTransition(async () => {
            try {
                const result = await grantAccess(studentEmail, activeCourseId);
                if (result.success) {
                    setMessage(result.message);
                    setStudentEmail("");
                } else {
                    setMessage("Error: " + result.message);
                }
            } catch (e) {
                setMessage("Failed to grant access");
            }
        });
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-12 min-h-screen bg-gray-50/50">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Control Room</h1>
                <p className="text-slate-500">Manage courses, chapters, and platform content.</p>

                {message && (
                    <div className="mt-4 p-4 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-2 border border-emerald-100">
                        <CheckCircle className="w-5 h-5" />
                        {message}
                    </div>
                )}
            </div>

            {/* 1. Create Course Section */}
            {!activeCourseId && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Plus className="w-5 h-5 text-orange-600" />
                            Create New Course
                        </h2>
                        <p className="text-sm text-slate-500">Start by creating a simplified draft.</p>
                    </div>

                    <div className="flex gap-4">
                        <Input
                            placeholder="e.g. Advanced Calculus 101"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="max-w-md"
                        />
                        <Button onClick={handleCreateCourse} disabled={isPending} className="bg-orange-600 hover:bg-orange-700 text-white">
                            {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Create Draft"}
                        </Button>
                    </div>
                </div>
            )}

            {/* 2. Course Editor (Visible after creation) */}
            {activeCourseId && (
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Add Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                    Add Chapter
                                </h2>
                                <span className="text-xs font-mono text-slate-400">ID: {activeCourseId}</span>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Chapter Title</Label>
                                    <Input
                                        placeholder="e.g. Introduction to Limits"
                                        value={chapterTitle}
                                        onChange={(e) => setChapterTitle(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Video URL</Label>
                                    <div className="relative">
                                        <Video className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <Input
                                            className="pl-10"
                                            placeholder="https://vimeo.com/..."
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Free Preview</Label>
                                        <p className="text-xs text-slate-500">Allow students to watch this without purchasing.</p>
                                    </div>
                                    <Switch
                                        checked={isFree}
                                        onCheckedChange={setIsFree}
                                    />
                                </div>

                                <Button onClick={handleAddChapter} disabled={isPending} className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12">
                                    {isPending ? <Loader2 className="animate-spin" /> : "Save Chapter to Database"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Publish & Grant Access */}
                    <div className="space-y-6">
                        {/* Publication */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-semibold text-slate-900">Publication Status</h3>
                            <div className="p-3 bg-amber-50 text-amber-700 text-sm rounded-md border border-amber-100 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Draft Mode
                            </div>
                            <p className="text-sm text-slate-500">
                                Once published, this course will be visible to all students on the home page.
                            </p>
                            <Button onClick={handlePublish} disabled={isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                                Publish Course Now
                            </Button>
                        </div>

                        {/* Manual Access Grant */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                Grant Access
                            </h3>
                            <p className="text-xs text-slate-500">Manually unlock this course for a student (e.g. after WhatsApp payment).</p>

                            <Input
                                placeholder="student@email.com"
                                onChange={(e) => setStudentEmail(e.target.value)}
                                value={studentEmail}
                            />

                            <Button onClick={handleGrantAccess} disabled={isPending} variant="secondary" className="w-full text-slate-700 border border-slate-200 hover:bg-slate-50">
                                Grant Access
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
