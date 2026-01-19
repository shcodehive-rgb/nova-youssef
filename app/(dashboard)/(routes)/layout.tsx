import Sidebar from "@/components/Sidebar";

export default function RoutesLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    );
}
