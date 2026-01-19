import { Suspense } from "react";
import {
    LayoutDashboard,
    LayoutTemplate,
    Newspaper,
    MonitorPlay,
    CreditCard,
    Trophy
} from "lucide-react";
import { SocialForm } from "./_components/social-form";
import { VisualsForm } from "./_components/visuals-form";
import { GeneralForm } from "./_components/general-form";
import { FooterForm } from "./_components/footer-form";
import { PricingForm } from "./_components/pricing-form";
import { ResultsForm } from "./_components/results-form";
import { BlogList } from "./_components/blog-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// ✅ Fix: Use 'any' for searchParams promise to avoid strict type conflicts during build
export default async function SettingsPage({
    searchParams,
}: {
    searchParams: Promise<any>
}) {
    const resolvedSearchParams = await searchParams;
    const activeTab = (resolvedSearchParams?.tab as string) || "general";

    const { userId } = await auth();

    // ✅ Fix: Guard against null userId
    if (!userId) {
        return redirect("/");
    }

    // Fetch data for tabs
    const siteConfig = await db.siteConfig.findUnique({
        where: { userId: userId }
    });

    // ✅ Fix: Explicitly handle the array type
    const pricingPlans = activeTab === "pricing"
        ? await db.pricingPlan.findMany({
            where: { userId: userId },
            orderBy: { price: "asc" }
        })
        : [];

    const getTitle = () => {
        switch (activeTab) {
            case "general": return "Général";
            case "visuals": return "Page d'accueil";
            case "footer": return "Pied de page";
            case "blog": return "Blog";
            case "courses": return "Affichage Cours";
            case "social": return "Réseaux Sociaux";
            case "pricing": return "Plans & Tarifs";
            case "results": return "Résultats Élèves";
            default: return "Paramètres";
        }
    };

    const getDescription = () => {
        switch (activeTab) {
            case "general": return "Nom de l'école, Logo";
            case "visuals": return "Hero, Images, Couleurs";
            case "footer": return "Liens, Copyright";
            case "blog": return "Articles, Paramètres";
            case "courses": return "Grille, Filtres";
            case "social": return "Liens profils";
            case "pricing": return "Gérez vos offres et tarifs";
            case "results": return "Captures d'écran, Témoignages";
            default: return "";
        }
    };

    return (
        <Suspense fallback={<div className="p-6">Chargement des paramètres...</div>}>
            <div className="p-6 md:p-10">
                <div className="max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {getTitle()}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            {getDescription()}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {activeTab === "general" && <GeneralForm />}
                        {activeTab === "visuals" && <VisualsForm />}
                        {activeTab === "social" && <SocialForm />}
                        {activeTab === "footer" && <FooterForm />}
                        {activeTab === "pricing" && <PricingForm initialData={pricingPlans} />}
                        {activeTab === "results" && siteConfig && <ResultsForm initialData={siteConfig} />}
                        {activeTab === "blog" && <BlogList />}

                        {activeTab === "courses" && (
                            <div className="p-6 border rounded-lg bg-gray-50 text-center text-slate-500">
                                <MonitorPlay className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Gestion des cours déplacée vers /teacher/settings/courses</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Suspense>
    );
}