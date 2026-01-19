import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Upsert the configuration for the user
        const settings = await db.siteConfig.upsert({
            where: {
                userId,
            },
            update: {
                ...values,
            },
            create: {
                userId,
                ...values,
            }
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.log("[SETTINGS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        // const settings = await db.siteSettings.findFirst();
        const settings = null;
        return NextResponse.json(settings);
    } catch (error) {
        console.log("[SETTINGS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
