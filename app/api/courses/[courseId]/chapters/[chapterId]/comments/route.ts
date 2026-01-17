import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        const { text } = await req.json();
        const { courseId, chapterId } = await params;

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!text) {
            return new NextResponse("Text is required", { status: 400 });
        }

        const userEmail = user.emailAddresses?.[0]?.emailAddress || "Étudiant";

        const comment = await db.comment.create({
            data: {
                text,
                chapterId: chapterId,
                userId: userId,
                userEmail: userEmail,
            }
        });

        return NextResponse.json(comment);
    } catch (error) {
        console.log("[COMMENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { courseId, chapterId } = await params;

        // Fetch course to get the teacher (owner) ID
        const course = await db.course.findUnique({
            where: {
                id: courseId,
            }
        });

        const comments = await db.comment.findMany({
            where: {
                chapterId: chapterId,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        // Map comments to add virtual isTeacher flag
        const commentsWithTeacherFlag = comments.map((comment: any) => ({
            ...comment,
            isTeacher: course ? comment.userId === course.userId : false
        }));

        return NextResponse.json(commentsWithTeacherFlag);
    } catch (error) {
        console.log("[COMMENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
