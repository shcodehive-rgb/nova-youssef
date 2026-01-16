import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params
}: {
    params: Promise<{ courseId: string; }>
}) => {
    const { courseId } = await params;

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            }
        }
    });

    if (!course) {
        return redirect("/");
    }

    if (course.chapters.length === 0) {
        return redirect("/");
    }

    return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;
