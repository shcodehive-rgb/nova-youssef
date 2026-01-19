"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BlogPost } from "@prisma/client";

export const getPosts = async () => {
    try {
        const { userId } = await auth();
        if (!userId) return [];

        const posts = await db.blogPost.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return posts;
    } catch {
        return [];
    }
}

export const getPost = async (postId: string) => {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const post = await db.blogPost.findUnique({
            where: {
                id: postId,
                userId
            }
        });

        return post;
    } catch {
        return null;
    }
}

export const createBlogPost = async (values: { title: string; slug: string }) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Check if slug exists
        const existing = await db.blogPost.findUnique({
            where: { slug: values.slug }
        });

        if (existing) {
            return { success: false, error: "Slug already in use" };
        }

        const post = await db.blogPost.create({
            data: {
                userId,
                title: values.title,
                slug: values.slug,
                isPublished: false
            }
        });

        return { success: true, data: post };
    } catch (error) {
        return { success: false, error: "Failed to create post" };
    }
}

export const updateBlogPost = async (postId: string, values: Partial<BlogPost>) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const post = await db.blogPost.update({
            where: {
                id: postId,
                userId
            },
            data: {
                ...values,
            }
        });

        return { success: true, data: post };
    } catch (error) {
        return { success: false, error: "Failed to update post" };
    }
}

export const deleteBlogPost = async (postId: string) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        await db.blogPost.delete({
            where: {
                id: postId,
                userId
            }
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete post" };
    }
}
