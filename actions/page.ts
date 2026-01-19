"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// Get all pages
export const getPages = async () => {
    try {
        const pages = await db.page.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return pages;
    } catch (error) {
        console.log("[GET_PAGES]", error);
        return [];
    }
}

// Get single page by ID
export const getPage = async (id: string) => {
    try {
        const page = await db.page.findUnique({
            where: { id }
        });
        return page;
    } catch (error) {
        console.log("[GET_PAGE]", error);
        return null;
    }
}

// Create Page
export const createPage = async (values: { title: string; slug: string; content: string; isPublished: boolean }) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const page = await db.page.create({
            data: {
                userId,
                ...values
            }
        });

        return { success: true, data: page };
    } catch (error) {
        console.log("[CREATE_PAGE]", error);
        return { success: false, error: (error as Error).message };
    }
}

// Update Page
export const updatePage = async (id: string, values: { title: string; slug: string; content: string; isPublished: boolean }) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Verify ownership
        const ownPage = await db.page.findUnique({
            where: { id, userId }
        });
        if (!ownPage) throw new Error("Unauthorized");

        const page = await db.page.update({
            where: { id },
            data: {
                ...values
            }
        });

        return { success: true, data: page };
    } catch (error) {
        console.log("[UPDATE_PAGE]", error);
        return { success: false, error: (error as Error).message };
    }
}

// Delete Page
export const deletePage = async (id: string) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Verify ownership
        const ownPage = await db.page.findUnique({
            where: { id, userId }
        });
        if (!ownPage) throw new Error("Unauthorized");

        await db.page.delete({
            where: { id }
        });

        return { success: true };
    } catch (error) {
        console.log("[DELETE_PAGE]", error);
        return { success: false, error: (error as Error).message };
    }
}
