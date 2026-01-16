import React from 'react';
import { FileText, Clock, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ExercisesPage() {
    // Mock exercise series data
    const exerciseSeries = [
        {
            id: 1,
            title: 'Serie 1: Limits',
            description: 'Practice problems on limits and continuity',
            difficulty: 'Beginner',
            problems: 15,
            estimatedTime: '45 min',
        },
        {
            id: 2,
            title: 'Serie 2: Derivatives',
            description: 'Master derivative calculations and applications',
            difficulty: 'Intermediate',
            problems: 20,
            estimatedTime: '60 min',
        },
        {
            id: 3,
            title: 'Serie 3: Integrals',
            description: 'Integration techniques and definite integrals',
            difficulty: 'Intermediate',
            problems: 18,
            estimatedTime: '55 min',
        },
        {
            id: 4,
            title: 'Serie 4: Differential Equations',
            description: 'Solve first and second order differential equations',
            difficulty: 'Advanced',
            problems: 12,
            estimatedTime: '70 min',
        },
        {
            id: 5,
            title: 'Serie 5: Complex Numbers',
            description: 'Operations and applications of complex numbers',
            difficulty: 'Intermediate',
            problems: 16,
            estimatedTime: '50 min',
        },
        {
            id: 6,
            title: 'Serie 6: Probability',
            description: 'Probability theory and statistical applications',
            difficulty: 'Beginner',
            problems: 14,
            estimatedTime: '40 min',
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
            case 'Intermediate':
                return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400';
            case 'Advanced':
                return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Practice Exercises
                    </h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        Coming Soon
                    </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Sharpen your skills with our curated exercise series
                </p>
            </div>

            {/* Exercise Series Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exerciseSeries.map((series) => (
                    <Card
                        key={series.id}
                        className="p-6 hover:shadow-lg dark:hover:shadow-zinc-900/50 transition-all duration-300 cursor-pointer group border-gray-200 dark:border-zinc-800"
                    >
                        {/* Icon Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
                                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <Badge className={getDifficultyColor(series.difficulty)}>
                                {series.difficulty}
                            </Badge>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {series.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {series.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <div className="flex items-center gap-1">
                                <Award className="w-3.5 h-3.5" />
                                <span>{series.problems} problems</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{series.estimatedTime}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    🚀 Feature in Development
                </h3>
                <p className="text-blue-800 dark:text-blue-400 text-sm">
                    Our exercise platform is currently under development. Soon you'll be able to practice with interactive problems, get instant feedback, and track your progress across all topics.
                </p>
            </div>
        </div>
    );
}
