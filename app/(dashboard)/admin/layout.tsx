import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

// TEMPORARY: Admin check disabled for testing
// const ADMIN_EMAIL = "amina@example.com";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TEMPORARY: Authentication check disabled - anyone can access admin
    // const user = await currentUser();

    // if (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    //     console.log(`Unauthorized access attempt by: ${user?.emailAddresses[0].emailAddress}`);
    //     return redirect("/");
    // }

    // Allow access to admin dashboard
    return (
        <div className="admin-layout">
            {children}
        </div>
    );
}
