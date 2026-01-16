import React from 'react';
import { GraduationCap, Download, FileText, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ExamsPage() {
    // Mock past exams data
    const pastExams = [
        {
            year: 2025,
            exams: [
                { id: 1, type: 'National', session: 'Normal', subject: 'Mathematics', date: 'June 2025' },
                { id: 2, type: 'National', session: 'Catch-up', subject: 'Mathematics', date: 'July 2025' },
                { id: 3, type: 'Regional', session: 'Normal', subject: 'Mathematics', date: 'June 2025' },
            ],
        },
        {
            year: 2024,
            exams: [
                { id: 4, type: 'National', session: 'Normal', subject: 'Mathematics', date: 'June 2024' },
                { id: 5, type: 'National', session: 'Catch-up', subject: 'Mathematics', date: 'July 2024' },
                { id: 6, type: 'Regional', session: 'Normal', subject: 'Mathematics', date: 'June 2024' },
            ],
        },
        {
            year: 2023,
            exams: [
                { id: 7, type: 'National', session: 'Normal', subject: 'Mathematics', date: 'June 2023' },
                { id: 8, type: 'National', session: 'Catch-up', subject: 'Mathematics', date: 'July 2023' },
                { id: 9, type: 'Regional', session: 'Normal', subject: 'Mathematics', date: 'June 2023' },
            ],
        },
        {
            year: 2022,
            exams: [
                { id: 10, type: 'National', session: 'Normal', subject: 'Mathematics', date: 'June 2022' },
                { id: 11, type: 'National', session: 'Catch-up', subject: 'Mathematics', date: 'July 2022' },
                { id: 12, type: 'Regional', session: 'Normal', subject: 'Mathematics', date: 'June 2022' },
            ],
        },
    ];

    const getExamTypeBadge = (type: string) => {
        return type === 'National'
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Preparation for Nationals
                    </h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        Coming Soon
                    </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Practice with past national and regional exams to ace your tests
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-gray-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
                            <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">National Exams</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 border-gray-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Years Available</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 border-gray-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                            <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">PDF</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">With Solutions</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Exams by Year */}
            <div className="space-y-6">
                {pastExams.map((yearGroup) => (
                    <div key={yearGroup.year} className="space-y-3">
                        {/* Year Header */}
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {yearGroup.year}
                            </h2>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
                        </div>

                        {/* Exams List */}
                        <div className="space-y-2">
                            {yearGroup.exams.map((exam) => (
                                <Card
                                    key={exam.id}
                                    className="p-4 hover:shadow-md dark:hover:shadow-zinc-900/50 transition-all duration-200 cursor-pointer group border-gray-200 dark:border-zinc-800"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg group-hover:bg-orange-100 dark:group-hover:bg-orange-950/30 transition-colors">
                                                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                                            </div>

                                            {/* Info */}
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {exam.subject} - {exam.session} Session
                                                    </h3>
                                                    <Badge className={getExamTypeBadge(exam.type)}>
                                                        {exam.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {exam.date}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
                    📝 Exam Archive Coming Soon
                </h3>
                <p className="text-purple-800 dark:text-purple-400 text-sm">
                    We're building a comprehensive archive of past national and regional exams with detailed solutions. You'll be able to download PDFs, practice online, and track your performance across different topics.
                </p>
            </div>
        </div>
    );
}
