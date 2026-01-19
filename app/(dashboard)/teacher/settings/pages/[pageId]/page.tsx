import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PageForm } from "./_components/page-form";

export const dynamic = "force-dynamic";

const PageIdPage = async ({
    params
}: {
    // ✅ Fix: Use 'any' to prevent PageProps type mismatch errors during build
    params: Promise<any>
}) => {
    // ✅ Fix: Await params explicitly
    const { pageId } = await params;

    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const page = await db.page.findUnique({
        where: { id: pageId }
    });

    if (!page) {
        return redirect("/teacher/settings/pages");
    }

    return (
        <div className="p-6">
            <PageForm initialData={page} />
        </div>
    );
}

export default PageIdPage;