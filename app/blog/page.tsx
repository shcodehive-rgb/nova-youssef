import Link from "next/link";
import { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BlogPost } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Blog - Conseils et Orientation | Nova Academy",
  description: "Découvrez nos articles sur la préparation du Bac, l'orientation post-bac et les meilleures méthodes de travail pour les étudiants marocains.",
};

export const revalidate = 0; // Always fresh

export default async function BlogPage() {
  const posts: BlogPost[] = await db.blogPost.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Blog & Actualités
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Toutes les ressources pour réussir vos études, vous orienter et exceller dans votre parcours académique.
          </p>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            <p>Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow p-6">

                  {/* Meta Tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      Article
                    </span>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {format(new Date(post.createdAt), "d MMMM yyyy", { locale: fr })}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt (Preview of Content) */}
                  <div className="relative mb-6 flex-grow">
                    <div
                      className="text-slate-500 text-sm leading-relaxed line-clamp-3 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content || "" }}
                    />
                    {/* Gradient overlay for text fade effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>

                  {/* Footer / Link */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-blue-600 hover:text-blue-700 font-medium group/btn">
                        Lire la suite
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

