import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PostForm } from "./_components/post-form";

const PostEditPage = async ({
    params
}: {
    params: Promise<{ postId: string }>
}) => {
    const { userId } = await auth();
    const { postId } = await params;

    if (!userId) {
        return redirect("/");
    }

    const post = await db.blogPost.findUnique({
        where: {
            id: postId,
            userId
        }
    });

    if (!post) {
        return redirect("/teacher/settings/blog");
    }

    return (
        <div className="p-6">
            <PostForm initialData={post} />
        </div>
    );
}

export default PostEditPage;
