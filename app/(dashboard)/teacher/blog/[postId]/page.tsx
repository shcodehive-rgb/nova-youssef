import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { BlogPostForm } from "../_components/blog-post-form";

export default async function BlogPostIdPage({
    params
}: {
    params: { postId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const blogPost = await db.blogPost.findUnique({
        where: {
            id: params.postId,
            userId
        }
    });

    if (!blogPost) {
        return redirect("/teacher/blog");
    }

    return (
        <div className="h-full bg-slate-50 dark:bg-zinc-900 border-t">
            <div className="max-w-6xl mx-auto">
                <BlogPostForm initialData={blogPost} />
            </div>
        </div>
    );
}
