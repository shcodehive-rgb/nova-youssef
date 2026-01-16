import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import { ChapterView } from "./_components/chapter-view";

const ChapterIdPage = async (
    props: {
        params: Promise<{ courseId: string; chapterId: string }>
    }
) => {
    const params = await props.params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const {
        chapter,
        course,
        attachments,
        nextChapter,
        previousChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div className="flex flex-col pt-[80px]">
            <ChapterView
                chapter={chapter}
                course={course}
                attachments={attachments}
                nextChapter={nextChapter}
                previousChapter={previousChapter}
                userProgress={userProgress}
                purchase={purchase}
                completeOnEnd={completeOnEnd}
            />
        </div>
    );
}

export default ChapterIdPage;
