import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await db.blogPost.findUnique({
        where: { slug }
    });

    if (!post) {
        return {
            title: "Article introuvable",
        }
    }

    return {
        title: `${post.title} - Blog Nova Academy`,
        description: post.metaDescription || post.title,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await db.blogPost.findUnique({
        where: {
            slug,
            isPublished: true
        }
    });

    if (!post) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Header / Cover Image */}
            <div className="w-full h-[400px] relative bg-slate-900">
                {post.coverImageUrl ? (
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                        <span className="text-6xl">📝</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
                        <div className="flex items-center gap-x-4 text-white/80 mb-4 text-sm font-medium">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                                Blog
                            </span>
                            <span>
                                {format(new Date(post.createdAt), "d MMMM yyyy", { locale: fr })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl break-words whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
            </div>
        </article>
    );
}
