import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Courses Manager</h1>
                    <p className="text-slate-500">View and manage your educational content.</p>
                </div>
                <Link href="/teacher/settings/courses/create">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Course
                    </Button>
                </Link>
            </div>

            {/* Data Table */}
            <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[300px]">Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                    No courses found. Create your first one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium text-slate-900">{course.title}</TableCell>
                                    <TableCell>{course.price ? `${course.price} DH` : "Free"}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>
                                            {course.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {new Date(course.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/teacher/settings/courses/${course.id}`}>
                                            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                                                <Pencil className="w-4 h-4 text-slate-600" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
