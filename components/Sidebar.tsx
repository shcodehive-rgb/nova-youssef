"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    FileText,
    GraduationCap,
    MoreHorizontal,
    Moon,
    Sun,
    User,
    ChevronDown,
    Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
    const pathname = usePathname();
    const [level, setLevel] = useState("2 Bac SM");
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle Dark Mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const navigation = [
        // { name: "Cours", href: "/search", icon: BookOpen },
        { name: "Exercises", href: "/exercises", icon: FileText },
        { name: "Exams / Nationals", href: "/exams", icon: GraduationCap },
        { name: "Settings", href: "/teacher/settings", icon: MoreHorizontal },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-4 z-50">
                <span className="font-bold text-lg dark:text-white">Nova Academy</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 transition-transform transform lg:translate-x-0 pt-16 lg:pt-0 flex flex-col shrink-0",
                    isMobileOpen ? "fixed inset-y-0 left-0 z-40 translate-x-0" : "hidden lg:flex"
                )}
            >
                {/* Header: Logo */}
                <div className="hidden lg:flex h-16 items-center px-6 border-b border-gray-200 dark:border-zinc-800">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight dark:text-white">
                        <span className="text-primary">NOVA</span> ACADEMY
                    </Link>
                </div>

                {/* Level Selector */}
                <div className="p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 dark:text-white"
                            >
                                {level}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setLevel("1 Bac Sc. Ex")}>
                                1 Bac Sc. Ex
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLevel("1 Bac Sc. Math")}>
                                1 Bac Sc. Math
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLevel("2 Bac PC/SVT")}>
                                2 Bac PC/SVT
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLevel("2 Bac SM")}>
                                2 Bac SM
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setLevel("University S1")}>
                                University S1
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-1 mt-2">
                    {navigation.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}


                </nav>

                {/* Footer: User Profile & Dark Mode */}
                <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Student</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
