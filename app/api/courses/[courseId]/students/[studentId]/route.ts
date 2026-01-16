import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; studentId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, studentId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        });

        if (!course) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Revoke by deleting the purchase record
        // We assume studentId passed in the URL is the USER ID from the User table
        const purchase = await db.purchase.deleteMany({
            where: {
                courseId: courseId,
                userId: studentId,
            }
        });

        return NextResponse.json(purchase);
    } catch (error) {
        console.log("[COURSE_STUDENT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
