import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
// import { AccessForm } from "./_components/access-form";

const CourseIdPage = async ({
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
            userId // Ensure ownership check 
        },
        include: {
            chapters: true, // Needed for isPublished check logic usually, but here we just need general info
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const whitelist = await db.courseWhitelist.findMany({
        where: {
            courseId: courseId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        // Price and Chapters are now managed elsewhere so maybe they block publishing globally, 
        // but for this visual completion we might just show General Completion? 
        // Or keep the global completion logic in the header? 
        // User asked for "SaaS Sidebar", usually header shows global status.
        course.price,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            {!course.isPublished && (
                <Banner
                    label="unpublished_course_warning" // Handling translation later or hardcode
                />
            )}

            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">
                        Général
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
                <Actions
                    disabled={!isComplete}
                    courseId={courseId}
                    isPublished={course.isPublished}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Informations de base
                        </h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div>
                    {/* Image Form with new Label */}
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />

                    {/* AccessForm moved to /students page */}
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;
