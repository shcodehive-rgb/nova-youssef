import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { ListChecks, File, Video } from "lucide-react";
import { ChaptersForm } from "../_components/chapters-form";
import { AttachmentForm } from "../_components/attachment-form";
import { Banner } from "@/components/banner";
import { Actions } from "../_components/actions";

const ChaptersPage = async ({
    params
}: {
    params: Promise<{ courseId: string }>
}) => {
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            {!course.isPublished && (
                <Banner
                    label=" unpublished_course_warning"
                />
            )}

            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">
                        Programme & Vidéos
                    </h1>
                    <span className="text-sm text-slate-700">
                        Gérez le contenu de votre cours (Vidéos et PDFs)
                    </span>
                </div>
                <Actions // Keeping Actions here as well to allow publish from any subpage? User requested "Save Buttons", but publish is distinct. Better to have it.
                    disabled={!isComplete} // This logic might need to be global. For now using local completeness or just letting it be disabled if not ready.
                    courseId={courseId}
                    isPublished={course.isPublished}
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={ListChecks} />
                        <h2 className="text-xl">
                            Liste des Chapitres
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                        Créez vos chapitres ici. Cliquez sur "Modifier" (stylo) pour ajouter la vidéo.
                    </p>
                    <ChaptersForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>

                <div className="space-y-6 pt-6 border-t">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={File} />
                        <h2 className="text-xl">
                            Documents & PDFs (Global)
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                        Ajoutez ici les documents qui concernent tout le cours (Pack Wataniyat, Résumés, etc).
                    </p>
                    <AttachmentForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChaptersPage;
