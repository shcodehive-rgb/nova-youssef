
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, ArrowRight, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog - Conseils et Orientation | Nova Academy",
  description: "Découvrez nos articles sur la préparation du Bac, l'orientation post-bac et les meilleures méthodes de travail pour les étudiants marocains.",
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "Comment préparer le Bac 2026 : Le Guide Ultime",
    excerpt: "Découvrez les stratégies gagnantes pour organiser vos révisions, gérer votre stress et exceller aux examens nationaux. Un plan d'action étape par étape pour réussir.",
    date: "15 Janvier 2026",
    category: "Conseils",
    categoryColor: "bg-blue-100 text-blue-700",
    imageUrl: "/placeholder-math.jpg", // Using existing placeholder for now
    slug: "comment-preparer-bac-2026"
  },
  {
    id: 2,
    title: "Orientation après le Bac : Choisir son école d'ingénieur",
    excerpt: "CPGE, ENSA, ENSAM ou FST ? Comparatif détaillé des filières d'ingénierie au Maroc pour vous aider à faire le bon choix selon votre profil et vos ambitions.",
    date: "10 Janvier 2026",
    category: "Orientation",
    categoryColor: "bg-purple-100 text-purple-700",
    imageUrl: "/placeholder-physics.jpg",
    slug: "orientation-apres-bac-ingenieur"
  },
  {
    id: 3,
    title: "5 Techniques de productivité pour les étudiants",
    excerpt: "Pomodoro, Fiche de révision, Mind Mapping... Maîtrisez ces méthodes éprouvées pour apprendre plus vite et retenir l'information plus longtemps.",
    date: "05 Janvier 2026",
    category: "Méthodologie",
    categoryColor: "bg-green-100 text-green-700",
    imageUrl: "/placeholder-concours.jpg",
    slug: "techniques-productivite-etudiant"
  }
];

export default function BlogPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-6">

                {/* Meta Tags */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {post.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer / Link */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-blue-600 hover:text-blue-700 font-medium group/btn">
                    Lire la suite
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
