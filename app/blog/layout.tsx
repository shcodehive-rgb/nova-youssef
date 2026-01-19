import Footer from "@/components/Footer";

const BlogLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow pt-[80px]">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default BlogLayout;
