import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
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

    return (
        <div className="h-full">
            <div className="h-full md:flex">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-64 fixed inset-y-0 z-50">
                    <div className="h-full border-r bg-white">
                        <div className="p-4 border-b h-16 flex items-center">
                            <span className="font-semibold text-lg text-slate-700 truncate">
                                {course.title}
                            </span>
                        </div>
                        {/* We need to pass courseId to sidebar links */}
                        <CourseSidebar courseId={course.id} />
                    </div>
                </div>

                {/* Content */}
                <main className="md:pl-64 h-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default CourseLayout;
