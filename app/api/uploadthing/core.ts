import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
};

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            console.log("[UPLOADTHING] Middleware running for courseImage");
            return await handleAuth();
        })
        .onUploadComplete(() => {
            console.log("[UPLOADTHING] Upload complete for courseImage");
        }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(async () => {
            console.log("[UPLOADTHING] Middleware running for courseAttachment");
            return await handleAuth();
        })
        .onUploadComplete(() => {
            console.log("[UPLOADTHING] Upload complete for courseAttachment");
        }),
    chapterImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            return await handleAuth();
        })
        .onUploadComplete(() => {
            console.log("[UPLOADTHING] Upload complete for chapterImage");
        }),
    // 👇👇👇 HNA FIN BADALNA (rddinaha 4GB) 👇👇👇
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "4GB" } })
        .middleware(async () => {
            console.log("[UPLOADTHING] Middleware running for chapterVideo");
            return await handleAuth();
        })
        .onUploadComplete(() => {
            console.log("[UPLOADTHING] Upload complete for chapterVideo");
        }),
    // 👆👆👆 Safi hadchi li kander
    chapterAttachment: f(["pdf", "text", "image"])
        .middleware(async () => {
            console.log("[UPLOADTHING] Middleware running for chapterAttachment");
            return await handleAuth();
        })
        .onUploadComplete(() => {
            console.log("[UPLOADTHING] Upload complete for chapterAttachment");
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;