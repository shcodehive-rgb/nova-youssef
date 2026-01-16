import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { text } = await req.json();
        const { courseId, chapterId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!text) {
            return new NextResponse("Text is required", { status: 400 });
        }

        const comment = await db.comment.create({
            data: {
                text,
                chapterId: chapterId,
                userId: userId,
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
        const { chapterId } = await params;

        const comments = await db.comment.findMany({
            where: {
                chapterId: chapterId,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.log("[COMMENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
