"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createPricingPlan(values: {
    title: string;
    price: number;
    frequency: string;
    features: string;
    url?: string;
    isRecommended?: boolean;
}) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "Unauthorized" };
        }

        const plan = await db.pricingPlan.create({
            data: {
                userId,
                ...values
            }
        });

        revalidatePath("/");
        revalidatePath("/teacher/settings");
        return { success: true, plan };
    } catch (error) {
        console.error("CREATE_PRICING_PLAN_ERROR", error);
        return { error: "Something went wrong" };
    }
}

export async function deletePricingPlan(planId: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "Unauthorized" };
        }

        const plan = await db.pricingPlan.delete({
            where: {
                id: planId,
                userId
            }
        });

        revalidatePath("/");
        revalidatePath("/teacher/settings");
        return { success: true, plan };
    } catch (error) {
        console.error("DELETE_PRICING_PLAN_ERROR", error);
        return { error: "Something went wrong" };
    }
}
