"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getSiteConfig = async (userId: string) => {
    try {
        const siteConfig = await db.siteConfig.findUnique({
            where: {
                userId,
            },
        });
        return siteConfig;
    } catch (error) {
        console.log("[GET_SITE_CONFIG]", error);
        return null;
    }
}

export const updateSiteConfig = async (values: any) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const siteConfig = await db.siteConfig.upsert({
            where: {
                userId,
            },
            update: {
                ...values,
            },
            create: {
                userId,
                ...values,
            }
        });

        revalidatePath("/");
        revalidatePath("/teacher/settings");

        return { success: true, data: siteConfig };
    } catch (error) {
        console.log("[UPDATE_SITE_CONFIG]", error);
        return { success: false, error: (error as Error).message };
    }
}
