"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const grantAccess = async (userEmail: string, courseId: string) => {
    try {
        // 1. Find User by Email
        const user = await db.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            // Option: Create user if they don't exist? For now, throw error.
            // Or better, create a 'placeholder' user if you want sales-first.
            // Let's assume user must exist (e.g. they signed up).
            throw new Error("User not found via email");
        }

        // 2. Check if purchase already exists
        const existingPurchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId,
                },
            },
        });

        if (existingPurchase) {
            return { success: true, message: "User already has access." };
        }

        // 3. Create Purchase Record
        await db.purchase.create({
            data: {
                userId: user.id,
                courseId: courseId,
            },
        });

        revalidatePath(`/admin/dashboard`);
        return { success: true, message: `Access granted to ${userEmail}` };

    } catch (error: any) {
        console.error("Grant Access Error:", error);
        return { success: false, message: error.message };
    }
};
