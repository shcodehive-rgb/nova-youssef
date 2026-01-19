import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Footer from "@/components/Footer";

interface PageViewerProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageViewerProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await db.page.findUnique({
        where: { slug }
    });

    if (!page) {
        return {
            title: "Page introuvable",
        }
    }

    return {
        title: `${page.title} - Nova Academy`,
    }
}

export default async function PageViewer({ params }: PageViewerProps) {
    const { slug } = await params;

    const page = await db.page.findUnique({
        where: {
            slug,
            isPublished: true
        }
    });

    if (!page) {
        return notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow pt-[140px] mb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
                        {page.title}
                    </h1>

                    <div
                        className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl break-words whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
