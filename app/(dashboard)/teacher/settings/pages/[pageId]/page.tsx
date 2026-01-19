import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PageForm } from "./_components/page-form";

const PageIdPage = async ({
    params
}: {
    params: { pageId: string }
}) => {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const page = await db.page.findUnique({
        where: { id: params.pageId }
    });

    if (!page) return redirect("/teacher/settings/pages");

    return (
        <div className="p-6">
            <PageForm initialData={page} />
        </div>
    );
}

export default PageIdPage;
