import Link from 'next/link';
import { Youtube, Instagram, Facebook, MessageCircle, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/db';

const Footer = async () => {
    // Determine the main teacher (single tenant mode for now)
    // We can fetch the first SiteConfig available or use the hardcoded teacher ID from env if set
    const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;

    let socialLinks: { label: string; url: string }[] = [];

    // Default fallback socials if none found (optional)
    // socialLinks = [
    //     { label: "Instagram", url: "#" },
    //     { label: "Facebook", url: "#" }
    // ];

    let siteConfig: any = null;

    if (teacherId) {
        try {
            siteConfig = await db.siteConfig.findUnique({
                where: { userId: teacherId }
            });
            if (siteConfig?.socialLinks) {
                socialLinks = siteConfig.socialLinks as { label: string; url: string }[];
            }
        } catch (error) {
            console.log("Database not synced, skipping footer fetch:", error);
        }
    }

    const getIcon = (label: string) => {
        const lower = label.toLowerCase();
        if (lower.includes("facebook")) return Facebook;
        if (lower.includes("instagram")) return Instagram;
        if (lower.includes("youtube")) return Youtube;
        if (lower.includes("twitter") || lower.includes("x")) return Twitter;
        if (lower.includes("linkedin")) return Linkedin;
        if (lower.includes("whatsapp")) return MessageCircle; // Or generic message
        return LinkIcon;
    }

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            {siteConfig?.footerLogoUrl ? (
                                <div className="relative h-10 w-40">
                                    <Image
                                        src={siteConfig.footerLogoUrl}
                                        alt={siteConfig.footerBrandName || "Logo"}
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            ) : (siteConfig?.footerLogoText1 || siteConfig?.footerLogoText2) ? (
                                <h2 className="text-2xl font-extrabold tracking-tight pb-1">
                                    <span style={{ color: siteConfig.footerLogoColor1 || "#ffffff" }}>{siteConfig.footerLogoText1}</span>
                                    <span style={{ color: siteConfig.footerLogoColor2 || "#ea580c" }}>{siteConfig.footerLogoText2}</span>
                                </h2>
                            ) : (siteConfig?.logoText1 || siteConfig?.logoText2) ? (
                                <h2 className="text-2xl font-extrabold tracking-tight pb-1">
                                    <span style={{ color: siteConfig.logoColor1 || "#000000" }}>{siteConfig.logoText1}</span>
                                    <span style={{ color: siteConfig.logoColor2 || "#ea580c" }}>{siteConfig.logoText2}</span>
                                </h2>
                            ) : siteConfig?.footerBrandName ? (
                                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                    {siteConfig.footerBrandName}
                                </h2>
                            ) : (
                                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                    Nova <span className="text-orange-600">Academy</span>
                                </h2>
                            )}
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            {siteConfig?.footerText || "Empowering the next generation of Moroccan scientists and engineers."}
                        </p>
                    </div>

                    {/* Dynamic Navigation Columns */}
                    {siteConfig?.footerLinks ? (
                        (siteConfig.footerLinks as any[]).map((col: any, idx: number) => (
                            <div key={idx}>
                                <h3 className="font-bold text-slate-900 mb-4">{col.header}</h3>
                                <ul className="space-y-3">
                                    {(col.links || []).map((link: any, k: number) => (
                                        <li key={k}>
                                            <Link href={link.url} className="text-slate-600 hover:text-orange-600 transition-colors text-sm">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        /* Fallback Columns if no config */
                        <>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-4">Plateforme</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">Accueil</Link></li>
                                    <li><Link href="/search" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">Nos Cours</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-4">Informations</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/terms" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">Conditions</Link></li>
                                    <li><Link href="/privacy" className="text-slate-600 hover:text-orange-600 transition-colors text-sm">Confidentialité</Link></li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Column 4: Contact (Static for now, or could be dynamic later) */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Besoin d&apos;aide ?</h3>
                        <a
                            href="https://wa.me/212600000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-md hover:bg-green-100 transition border border-green-200 w-full"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-medium text-sm">Discuter sur WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">
                        {siteConfig?.footerCopyright || `© ${new Date().getFullYear()} Nova Academy. Built with ❤️ in Morocco.`}
                    </p>
                    <div className="flex items-center gap-6">
                        {socialLinks.length === 0 ? (
                            <span className="text-xs text-slate-400">Suivez-nous sur les réseaux</span>
                        ) : (
                            socialLinks.map((link, idx) => {
                                const Icon = getIcon(link.label);
                                return (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-orange-600 transition-colors"
                                        title={link.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="sr-only">{link.label}</span>
                                    </a>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
