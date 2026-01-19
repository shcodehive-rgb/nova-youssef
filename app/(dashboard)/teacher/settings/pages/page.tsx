import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";

const PagesPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect("/");

    let pages = [];
    try {
        pages = await db.page.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    } catch (error) {
        console.error("Failed to fetch pages:", error);
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load pages. Please ensure database is synced.
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Pages Personnalisées</h1>
                <Link href="/teacher/settings/pages/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle Page
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-sm text-slate-500">
                    <div className="col-span-5">Titre</div>
                    <div className="col-span-3">Slug (URL)</div>
                    <div className="col-span-2">Statut</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                {pages.length === 0 ? (
                    <div className="p-10 text-center text-slate-500 italic">
                        Aucune page créée.
                    </div>
                ) : (
                    pages.map((page) => (
                        <div key={page.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm">
                            <div className="col-span-5 font-medium">{page.title}</div>
                            <div className="col-span-3 text-slate-500 font-mono text-xs truncate flex items-center gap-x-2">
                                <span className="truncate">/pages/{page.slug}</span>
                                <CopyButton value={`${process.env.NEXT_PUBLIC_APP_URL || ""}/pages/${page.slug}`} />
                            </div>
                            <div className="col-span-2">
                                <Badge variant={page.isPublished ? "default" : "secondary"}>
                                    {page.isPublished ? "Publié" : "Brouillon"}
                                </Badge>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-2">
                                <Link href={`/teacher/settings/pages/${page.id}`}>
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

export default PagesPage;
