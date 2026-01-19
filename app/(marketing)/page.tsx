import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { db } from "@/lib/db";
import Footer from "@/components/Footer";
import { PricingSection } from "@/components/PricingSection";
import { ResultsCarousel } from "@/components/ResultsCarousel";
import Navbar from "@/components/Navbar";

export default async function Home() {
    // 1. Redirect if disabled (Currently Active)
    // Remove this line to enable the landing page
    // return redirect("/sign-in");

    // 2. Auth Redirect (Disabled to allow everyone to see the Landing Page)
    // const { userId } = await auth();
    // if (userId) {
    //     return redirect("/search");
    // }

    // 3. Fetch Data
    const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;
    let siteConfig = null;
    let pricingPlans = [];

    if (teacherId) {
        try {
            siteConfig = await db.siteConfig.findUnique({
                where: { userId: teacherId }
            });

            pricingPlans = await db.pricingPlan.findMany({
                where: { userId: teacherId },
                orderBy: { price: "asc" }
            });

        } catch (error) {
            console.log("Error fetching site config:", error);
        }
    }

    // 4. Render Page
    return (
        <div className="min-h-screen">
            <main>
                <HeroSection
                    title={siteConfig?.heroTitle}
                    description={siteConfig?.heroDescription}
                />

                {siteConfig?.resultsImages && siteConfig.resultsImages.length > 0 && (
                    <ResultsCarousel images={siteConfig.resultsImages} />
                )}

                <PricingSection plans={pricingPlans} />

                <Footer />
            </main>
        </div>
    );
}
