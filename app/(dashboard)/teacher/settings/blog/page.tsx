import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BlogSettingsPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    const posts = await db.blogPost.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Articles de Blog</h1>
                <Link href="/teacher/settings/blog/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvel Article
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-sm text-slate-500">
                    <div className="col-span-1">Image</div>
                    <div className="col-span-5">Titre</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Statut</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                {posts.length === 0 ? (
                    <div className="p-10 text-center text-slate-500 italic">
                        Aucun article crée.
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm">
                            <div className="col-span-1 relative h-10 w-16 overflow-hidden rounded-md bg-slate-100">
                                {post.coverImageUrl ? (
                                    <Image
                                        src={post.coverImageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
                                        No Img
                                    </div>
                                )}
                            </div>
                            <div className="col-span-5 font-medium truncate pr-4">{post.title}</div>
                            <div className="col-span-2 text-slate-500 text-xs">
                                {format(post.createdAt, "d MMMM yyyy", { locale: fr })}
                            </div>
                            <div className="col-span-2">
                                <Badge variant={post.isPublished ? "default" : "secondary"}>
                                    {post.isPublished ? "Publié" : "Brouillon"}
                                </Badge>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-2">
                                <Link href={`/teacher/settings/blog/${post.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default BlogSettingsPage;
