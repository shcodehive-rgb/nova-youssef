// src/actions/courses.ts
"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; // T2aked mn had l-import 3la 7sab version
import { revalidatePath } from "next/cache";

export const createCourse = async (title: string) => {
    try {
        console.log("👉 DEBUG: Bdayt kan-créer course...", title);

        const { userId } = await auth();
        console.log("👉 DEBUG: User ID howa:", userId);

        if (!userId) {
            console.error("❌ Error: User ID ma-tla3ch (Unauthorized)");
            throw new Error("Unauthorized");
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            },
        });

        console.log("✅ Success: Course t-créer:", course.id);
        revalidatePath("/admin/courses");
        return course;

    } catch (error) {
        // Hada howa l-mohim: Ghadi ywarina l-ghalat l-kamel
        console.error("❌ REAL ERROR (L-GHALAT L-7A9I9I):", error);
        throw new Error("Failed to create course");
    }
};

export const addChapter = async (
    courseId: string,
    title: string,
    videoUrl: string,
    isFree: boolean
) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            throw new Error("Unauthorized");
        }

        const lastChapter = await db.chapter.findFirst({
            where: { courseId },
            orderBy: { position: 'desc' },
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                videoUrl,
                isFree,
                position: newPosition,
                courseId,
            },
        });

        revalidatePath(`/admin/courses/${courseId}`);
        return chapter;
    } catch (error) {
        console.error("[ADD_CHAPTER]", error);
        throw new Error("Failed to add chapter");
    }
};

export const publishCourse = async (courseId: string) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            throw new Error("Unauthorized");
        }

        const course = await db.course.update({
            where: { id: courseId },
            data: {
                isPublished: true,
            },
        });
        revalidatePath(`/admin/courses/${courseId}`);
        return course;
    } catch (error) {
        console.error("[PUBLISH_COURSE]", error);
        throw new Error("Failed to publish course");
    }
};