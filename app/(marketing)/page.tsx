import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";
import { HeroCarousel } from "./_components/hero-carousel";
import { FeaturesSection } from "./_components/features-section";
import { ShowcaseSection } from "./_components/showcase-section";
import { PricingSection } from "./_components/pricing-section";
import { StatsSection } from "./_components/stats-section";
import { NewsletterSection } from "./_components/newsletter-section";
import { FAQSection } from "./_components/faq-section";

export default async function MarketingPage() {
    // Redirect logged-in users to dashboard
    const { userId } = await auth();
    if (userId) {
        return redirect("/home");
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Headline with Serif Font - Wider & Bigger */}
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 leading-tight mb-12">
                            Le futur de votre business éducatif commence ici.
                        </h1>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                            <Link href="/sign-up">
                                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                                    Commencer gratuitement
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#tarifs">
                                <Button size="lg" variant="outline" className="border-2 border-slate-300 text-slate-900 font-semibold px-8 py-6 text-lg rounded-full hover:border-slate-400 transition-all">
                                    Voir les tarifs
                                </Button>
                            </Link>
                        </div>

                        {/* Auto-Play Carousel */}
                        <div className="relative mt-12">
                            <HeroCarousel autoPlayInterval={4000} />
                        </div>

                        {/* Demo Button */}
                        <div className="mt-8 flex justify-center">
                            <Link href="#demo">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="text-slate-700 hover:text-slate-900 font-medium gap-2"
                                >
                                    <Play className="h-5 w-5" />
                                    Voir une démo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>
            </section>

            {/* Features Section */}
            <FeaturesSection />

            {/* Showcase Section - Zig-Zag Layout */}
            <ShowcaseSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Newsletter Section */}
            <NewsletterSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer */}
            <MarketingFooter />
        </div>
    );
}
