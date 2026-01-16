"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentData {
    id: string; // Purchase ID
    userId: string; // User ID
    email: string;
    createdAt: string;
}

interface StudentClientProps {
    data: StudentData[];
    courseId: string;
}

export const StudentClient = ({
    data,
    courseId
}: StudentClientProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const onRevoke = async (userId: string) => {
        try {
            setIsDeleting(userId);
            await axios.delete(`/api/courses/${courseId}/students/${userId}`);
            toast.success("Accès retiré avec succès");
            router.refresh();
        } catch (error) {
            toast.error("Erreur lors du retrait de l'accès");
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="space-y-2">
            {data.map((student) => (
                <div
                    key={student.id}
                    className="text-sm p-3 bg-white border border-slate-200 rounded-md flex items-center justify-between shadow-sm"
                >
                    <div className="flex flex-col">
                        <span className="font-medium truncate max-w-[150px] sm:max-w-xs">{student.email}</span>
                        <span className="text-xs text-slate-500">
                            Rejoint le {new Date(student.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <Button
                        onClick={() => onRevoke(student.userId)}
                        variant="ghost"
                        size="sm"
                        disabled={isDeleting === student.userId}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        {isDeleting === student.userId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            ))}
        </div>
    )
}
