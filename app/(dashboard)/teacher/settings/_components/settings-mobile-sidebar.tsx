"use client";

import { Menu, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import {
    LayoutDashboard,
    Globe,
    Share2,
    LayoutTemplate,
    Newspaper,
    FileText,
    MonitorPlay,
    CreditCard,
    Trophy
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define settings tabs (same as in layout)
const settingsTabs = [
    { id: "general", label: "Général", icon: LayoutDashboard, href: "/teacher/settings" },
    { id: "visuals", label: "Page d'accueil", icon: Globe, href: "/teacher/settings?tab=visuals" },
    { id: "footer", label: "Pied de page", icon: LayoutTemplate, href: "/teacher/settings?tab=footer" },
    { id: "blog", label: "Blog", icon: Newspaper, href: "/teacher/settings?tab=blog" },
    { id: "courses", label: "Affichage Cours", icon: MonitorPlay, href: "/teacher/settings/courses" },
    { id: "social", label: "Réseaux Sociaux", icon: Share2, href: "/teacher/settings?tab=social" },
    { id: "pricing", label: "Tarifs / Packs", icon: CreditCard, href: "/teacher/settings?tab=pricing" },
    { id: "results", label: "Résultats Élèves", icon: Trophy, href: "/teacher/settings?tab=results" },
    { id: "pages", label: "Pages", icon: FileText, href: "/teacher/settings/pages" },
];

export const SettingsMobileSidebar = () => {
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    // Check if we are in a course context
    const courseId = params.courseId as string;
    const isCoursePage = !!courseId;

    // Determine active top-level tab
    const currentTab = searchParams.get("tab") || (pathname.includes("/courses") ? "courses" : "general");

    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <div className="h-full p-6 space-y-2 overflow-y-auto">
                    {/* Exit Settings Button */}
                    <div className="mb-6">
                        <SheetClose asChild>
                            <Link href="/home">
                                <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-slate-900 -ml-2 w-full justify-start">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Exit Settings
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>

                    <h2 className="text-lg font-bold mb-4 px-3">Paramètres</h2>

                    {/* Navigation Tabs */}
                    {settingsTabs.map((tab) => {
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
                        } else if (tab.id === "pages") {
                            isActive = pathname.includes("/teacher/settings/pages");
                        }

                        // Special rendering for "Affichage Cours" when inside a course
                        if (tab.id === "courses") {
                            return (
                                <div key={tab.id}>
                                    <SheetClose asChild>
                                        <Link href={tab.href}>
                                            <div className={cn(
                                                "w-full flex items-center gap-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                                isActive
                                                    ? "bg-slate-100 text-slate-900"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            )}>
                                                <Icon className="w-4 h-4" />
                                                {tab.label}
                                            </div>
                                        </Link>
                                    </SheetClose>

                                    {/* Render Sub-items if inside a course */}
                                    {isCoursePage && (
                                        <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                                            <SheetClose asChild>
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
                                            </SheetClose>
                                            <SheetClose asChild>
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
                                            </SheetClose>
                                            <SheetClose asChild>
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
                                            </SheetClose>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Standard Rendering for other tabs
                        return (
                            <SheetClose asChild key={tab.id}>
                                <Link href={tab.href}>
                                    <div className={cn(
                                        "w-full flex items-center gap-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    )}>
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </div>
                                </Link>
                            </SheetClose>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
};
