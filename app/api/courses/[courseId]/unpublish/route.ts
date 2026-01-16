import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: courseId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedCourse);
    } catch (error) {
        console.log("[COURSE_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
