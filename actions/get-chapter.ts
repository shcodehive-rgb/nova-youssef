import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({
    userId,
    courseId,
    chapterId,
}: GetChapterProps) => {
    try {
        let purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            },
            include: {
                attachments: {
                    orderBy: {
                        createdAt: "desc",
                    }
                },
            },
        });

        if (!chapter || !course) {
            throw new Error("Chapter or course not found");
        }

        // Whitelist Check
        if (!purchase) {
            const user = await currentUser();
            const userEmail = user?.emailAddresses?.[0]?.emailAddress;

            if (userEmail) {
                const whitelisted = await db.courseWhitelist.findFirst({
                    where: {
                        email: userEmail,
                        courseId: courseId,
                    }
                });

                if (whitelisted) {
                    purchase = {
                        id: whitelisted.id,
                        userId: userId,
                        courseId: courseId,
                        createdAt: whitelisted.createdAt,
                        updatedAt: whitelisted.createdAt,
                    } as any;
                }
            }
        }

        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;
        let previousChapter: Chapter | null = null;

        if (chapter.attachments) {
            attachments = chapter.attachments;
        }

        if (chapter.isFree || purchase) {
            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter.position,
                    },
                },
                orderBy: {
                    position: "asc",
                },
            });

            previousChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        lt: chapter.position,
                    },
                },
                orderBy: {
                    position: "desc",
                },
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                },
            },
        });

        return {
            chapter,
            course,
            attachments,
            nextChapter,
            previousChapter,
            userProgress,
            purchase,
        };
    } catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            attachments: [],
            nextChapter: null,
            previousChapter: null,
            userProgress: null,
            purchase: null,
        };
    }
};
