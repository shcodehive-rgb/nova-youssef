"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    isGuest?: boolean;
}

export const UserMenu = ({ isGuest = false }: UserMenuProps) => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    if (!user && !isGuest) return null;

    const imageUrl = user?.imageUrl;
    const fullName = user?.fullName || "Invité Nova";
    const email = user?.primaryEmailAddress?.emailAddress || "guest@nova.academy";

    const handleGuestClick = (e: React.MouseEvent) => {
        if (isGuest) {
            e.preventDefault();
            router.push("/sign-in");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none ring-0">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={imageUrl} />
                        <AvatarFallback className="bg-slate-100">
                            <User className="h-5 w-5 text-slate-500" />
                        </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{fullName}</p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <Link href="/home" onClick={handleGuestClick}>
                    <DropdownMenuItem className="cursor-pointer gap-2">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Mon Espace
                    </DropdownMenuItem>
                </Link>

                <Link href="/teacher/settings" onClick={handleGuestClick}>
                    <DropdownMenuItem className="cursor-pointer gap-2">
                        <Settings className="h-4 w-4 mr-2" />
                        Paramètres du Site
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                {isGuest ? (
                    <DropdownMenuItem
                        className="cursor-pointer text-slate-600 gap-2"
                        onClick={() => router.push("/sign-in")}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Se connecter
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 gap-2"
                        onClick={() => signOut(() => router.push("/"))}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Déconnexion
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
