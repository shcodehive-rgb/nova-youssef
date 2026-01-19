"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createCategory(name: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const category = await db.category.create({
            data: {
                name: name,
            },
        });

        // Revalidate the course page so the new category appears in options
        revalidatePath(`/teacher/courses`);

        return category;
    } catch (error) {
        console.error("[CATEGORY_CREATE_ERROR]", error);
        throw new Error("Failed");
    }
}
