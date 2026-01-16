export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full pt-16">
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}