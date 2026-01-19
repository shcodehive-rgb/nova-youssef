import Footer from "@/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <div className="pt-[80px] h-full">
                {children}
            </div>
            <Footer />
        </div>
    );
}