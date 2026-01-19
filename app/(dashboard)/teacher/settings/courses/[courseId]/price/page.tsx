import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign } from "lucide-react";
import { PriceForm } from "../_components/price-form";
import { Banner } from "@/components/banner";
import { Actions } from "../_components/actions";

const PricePage = async ({
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
            chapters: true // Included to keep Types happy if PriceForm expects generic course
        }
    });

    if (!course) {
        return redirect("/");
    }

    return (
        <div className="p-6">
            {!course.isPublished && (
                <Banner
                    label="unpublished_course_warning"
                />
            )}

            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">
                        Prix
                    </h1>
                    <span className="text-sm text-slate-700">
                        Définissez le prix de votre cours
                    </span>
                </div>
                <Actions
                    disabled={false} // Price page doesn't usually block publish unless price is invalid, leaving enabled or following main logic.
                    courseId={courseId}
                    isPublished={course.isPublished}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex items-center gap-x-2 mb-6">
                        <IconBadge icon={CircleDollarSign} />
                        <h2 className="text-xl">
                            Tarification
                        </h2>
                    </div>
                    <PriceForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default PricePage;
