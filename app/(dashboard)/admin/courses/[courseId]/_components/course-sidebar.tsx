"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ListVideo, CircleDollarSign, Users } from "lucide-react";
import Link from "next/link";

interface CourseSidebarItemProps {
    label: string;
    href: string;
    icon: any;
    isActive?: boolean;
}

const CourseSidebarItem = ({
    label,
    href,
    icon: Icon,
    isActive
}: CourseSidebarItemProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 font-bold border-r-4 border-sky-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
                {label}
            </div>
        </Link>
    )
}

export const CourseSidebar = ({ courseId }: { courseId: string }) => {
    const pathname = usePathname();

    const routes = [
        {
            icon: LayoutDashboard,
            label: "Général",
            href: `/admin/courses/${courseId}`,
            // Active if exactly root course path confirmed by checking correctness later or strict match? 
            // Usually strict match for root, but let's see. 
            // Actually general is the distinct root page.
            active: pathname === `/admin/courses/${courseId}`
        },
        {
            icon: ListVideo,
            label: "Programme & Vidéos",
            href: `/admin/courses/${courseId}/chapters`,
            active: pathname.includes(`/admin/courses/${courseId}/chapters`)
        },
        {
            icon: CircleDollarSign,
            label: "Prix",
            href: `/admin/courses/${courseId}/price`,
            active: pathname.includes(`/admin/courses/${courseId}/price`)
        },
        {
            icon: Users,
            label: "Élèves",
            href: `/admin/courses/${courseId}/students`,
            active: pathname.includes(`/admin/courses/${courseId}/students`)
        },
    ];

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                {/* Back Button possibly? Or just title */}
                <h1 className="font-bold text-xl text-primary">Gestion du Cours</h1>
            </div>
            <div className="flex flex-col w-full">
                {routes.map((route) => (
                    <CourseSidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                        isActive={route.active}
                    />
                ))}
            </div>
        </div>
    )
}
