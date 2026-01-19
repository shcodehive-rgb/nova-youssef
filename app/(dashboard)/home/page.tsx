import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { HeroSection } from "./_components/hero-section";
import { PricingSection } from "@/components/PricingSection";
import { ResultsCarousel } from "@/components/ResultsCarousel";

export default async function SchoolHomePage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    // Fetch Site Config with safe fallback
    let siteConfig = null;
    let pricingPlans: any[] = [];
    try {
        siteConfig = await db.siteConfig.findFirst();
        pricingPlans = await db.pricingPlan.findMany({
            where: { userId: siteConfig?.userId || userId },
            orderBy: { price: "asc" }
        });
    } catch (error) {
        console.log("SiteConfig error (table missing):", error);
    }



    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* Hero Section (Client Component with Animation) */}
                <HeroSection
                    title={siteConfig?.heroTitle}
                    description={siteConfig?.heroDescription}
                />

                {siteConfig?.resultsImages && siteConfig.resultsImages.length > 0 && (
                    <ResultsCarousel images={siteConfig.resultsImages} />
                )}

                {/* Dynamic Pricing Section */}
                <PricingSection plans={pricingPlans} />


            </div>
        </div>
    );
}
