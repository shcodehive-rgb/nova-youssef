"use client";

import { Suspense } from "react";
import {
    LayoutDashboard,
    Globe,
    Share2,
    LayoutTemplate,
    Newspaper,
    FileText,
    MonitorPlay,
    ArrowLeft,
    Video,
    Users,
    ChevronDown,
    CreditCard,
    Trophy,
    ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { SettingsMobileSidebar } from "./_components/settings-mobile-sidebar";

// Define base settings tabs
const settingsTabs = [
    { id: "general", label: "Général", icon: LayoutDashboard, href: "/teacher/settings" },
    { id: "visuals", label: "Page d'accueil", icon: Globe, href: "/teacher/settings?tab=visuals" },
    { id: "footer", label: "Pied de page", icon: LayoutTemplate, href: "/teacher/settings?tab=footer" },
    { id: "blog", label: "Blog", icon: Newspaper, href: "/teacher/settings?tab=blog" },
    { id: "courses", label: "Affichage Cours", icon: MonitorPlay, href: "/teacher/settings/courses" },
    { id: "students", label: "Accès Étudiants", icon: Users, href: "/teacher/settings?tab=students" },
    { id: "social", label: "Réseaux Sociaux", icon: Share2, href: "/teacher/settings?tab=social" },
    { id: "pricing", label: "Tarifs / Packs", icon: CreditCard, href: "/teacher/settings?tab=pricing" },
    { id: "results", label: "Résultats Élèves", icon: Trophy, href: "/teacher/settings?tab=results" },
    { id: "pages", label: "Pages", icon: FileText, href: "/teacher/settings/pages" },
];

function SettingsLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = useAuth();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    // Check if Super Admin
    const isSuperAdmin = userId === process.env.NEXT_PUBLIC_TEACHER_ID;

    // Extend tabs if admin
    const currentTabs = [...settingsTabs];
    if (isSuperAdmin) {
        currentTabs.push({ id: "admin", label: "Admin (Roles)", icon: ShieldAlert, href: "/teacher/settings?tab=admin" });
    }

    // Check if we are in a course context
    const courseId = params.courseId as string;
    const isCoursePage = !!courseId;

    // Determine active top-level tab
    const currentTab = searchParams.get("tab") || (pathname.includes("/courses") ? "courses" : "general");

    return (
        <div className="h-full w-full bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row">

                {/* SETTINGS SIDEBAR (Desktop) */}
                <div className="hidden md:block w-64 border-r border-gray-100 dark:border-zinc-800 h-full p-6 space-y-2 shrink-0 overflow-y-auto">
                    <div className="mb-6">
                        <Link href="/home">
                            <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-slate-900 -ml-2">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Exit Settings
                            </Button>
                        </Link>
                    </div>

                    <h2 className="text-lg font-bold mb-4 px-3">Paramètres</h2>

                    {currentTabs.map((tab) => {
                        const Icon = tab.icon;

                        // Check if this tab is active
                        let isActive = false;
                        if (tab.href.includes("?tab=")) {
                            const tabValue = tab.href.split("?tab=")[1];
                            isActive = currentTab === tabValue && !isCoursePage;
                        } else if (tab.id === "general") {
                            isActive = pathname === "/teacher/settings" && !searchParams.get("tab") && !isCoursePage;
                        } else if (tab.id === "courses") {
                            isActive = pathname.includes("/teacher/settings/courses");
                        }

                        // Special rendering for "Affichage Cours" when inside a course
                        if (tab.id === "courses") {
                            return (
                                <div key={tab.id}>
                                    <Link href={tab.href}>
                                        <div className={cn(
                                            "w-full flex items-center gap-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                            isActive
                                                ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-zinc-900 dark:hover:text-white"
                                        )}>
                                            <Icon className="w-4 h-4" />
                                            {tab.label}
                                        </div>
                                    </Link>

                                    {/* Render Sub-items if inside a course */}
                                    {isCoursePage && (
                                        <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                                            <Link href={`/teacher/settings/courses/${courseId}`}>
                                                <div className={cn(
                                                    "w-full flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                                    pathname === `/teacher/settings/courses/${courseId}`
                                                        ? "text-orange-600 bg-orange-50"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}>
                                                    <span>Général</span>
                                                </div>
                                            </Link>
                                            <Link href={`/teacher/settings/courses/${courseId}/chapters`}>
                                                <div className={cn(
                                                    "w-full flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                                    pathname.includes(`/chapters`)
                                                        ? "text-orange-600 bg-orange-50"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}>
                                                    <span>Programme & Vidéos</span>
                                                </div>
                                            </Link>
                                            <Link href={`/teacher/settings/courses/${courseId}/students`}>
                                                <div className={cn(
                                                    "w-full flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                                    pathname.includes(`/students`)
                                                        ? "text-orange-600 bg-orange-50"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}>
                                                    <span>Élèves</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Standard Rendering for other tabs
                        return (
                            <Link key={tab.id} href={tab.href}>
                                <div className={cn(
                                    "w-full flex items-center gap-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-zinc-900 dark:hover:text-white"
                                )}>
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE NAVBAR with Menu Trigger */}
                <div className="md:hidden border-b bg-white dark:bg-black sticky top-0 z-10 h-14 flex items-center px-4">
                    <SettingsMobileSidebar />
                    <h2 className="text-lg font-semibold ml-2">Paramètres</h2>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 h-full overflow-y-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="p-6">Loading settings...</div>}>
            <SettingsLayoutContent>{children}</SettingsLayoutContent>
        </Suspense>
    );
}
