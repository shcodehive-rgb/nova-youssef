import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { Users } from "lucide-react";
import { AccessForm } from "../_components/access-form";
import { columns } from "./_components/columns"; // We will mock this inline or just render table directly for now as simple
import { DataTable } from "./_components/data-table"; // Or just use a simple table for now to save complexity
import { StudentClient } from "./_components/student-client"; // Actually let's just do it all in page or a dedicated client component

const StudentsPage = async ({
    params
}: {
    params: Promise<{ courseId: string }>
}) => {
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId
        }
    });

    if (!course) {
        return redirect("/");
    }

    // 1. Fetch Whitelist (for manual access form)
    const whitelist = await db.courseWhitelist.findMany({
        where: {
            courseId: courseId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    // 2. Fetch Purchases (for the student list table)
    const purchases = await db.purchase.findMany({
        where: {
            courseId: courseId,
        },
        include: {
            user: true, // Need user details
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return (
        <div className="p-6">
            <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={Users} />
                <h1 className="text-2xl font-bold">
                    Gestion des Élèves
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Manual Access Form */}
                <div>
                    <AccessForm
                        courseId={course.id}
                        whitelist={whitelist}
                    />
                </div>

                {/* Right Column: List of Enrolled Students (Purchases) */}
                <div className="space-y-6">
                    <div className="border bg-slate-100 rounded-md p-4">
                        <div className="font-medium mb-4">
                            Liste des Étudiants Inscrits (via Achat ou Activation)
                        </div>
                        {purchases.length === 0 ? (
                            <div className="text-center py-4 text-slate-500 text-sm">
                                Aucun étudiant inscrit pour le moment.
                            </div>
                        ) : (
                            <StudentClient
                                data={purchases.map(purchase => ({
                                    id: purchase.id,
                                    userId: purchase.userId, // This is what we need for revocation API
                                    email: purchase.user?.email || "Email inconnu",
                                    createdAt: purchase.createdAt.toISOString(),
                                }))}
                                courseId={courseId}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsPage;
