"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const grantAccess = async (email: string, courseId: string) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Ensure email is valid
        if (!email || !email.includes("@")) {
            return { error: "Invalid email" };
        }

        const existing = await db.courseWhitelist.findFirst({
            where: {
                email,
                courseId,
            }
        });

        if (existing) {
            return { error: "User already has access via whitelist" };
        }

        await db.courseWhitelist.create({
            data: {
                email,
                courseId,
            }
        });

        revalidatePath(`/admin/courses/${courseId}`);
        return { success: "Access granted successfully" };

    } catch (error) {
        console.error("[GRANT_ACCESS_ERROR]", error);
        return { error: "Something went wrong" };
    }
}

export const revokeAccess = async (whitelistId: string, courseId: string) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "Unauthorized" };
        }

        await db.courseWhitelist.delete({
            where: {
                id: whitelistId,
            }
        });

        revalidatePath(`/admin/courses/${courseId}`);
        return { success: "Access revoked successfully" };

    } catch (error) {
        console.error("[REVOKE_ACCESS_ERROR]", error);
        return { error: "Something went wrong" };
    }
}
