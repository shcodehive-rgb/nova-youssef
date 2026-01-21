import { MarketingNavbar } from "./_components/navbar";
import { MarketingFooter } from "@/components/marketing-footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <MarketingNavbar />
            {children}
            <MarketingFooter />
        </main>
    );
}
