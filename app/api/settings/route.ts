import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is Admin (Can use helper function or check specific email/role)
        // For now, assuming middleware/layout protects this route's page, but API should be secure too.
        // Ideally we check isAdmin(userId).

        // let settings = await db.siteSettings.findFirst();

        // if (settings) {
        //     settings = await db.siteSettings.update({
        //         where: { id: settings.id },
        //         data: { ...values },
        //     });
        // } else {
        //     settings = await db.siteSettings.create({
        //         data: { ...values },
        //     });
        // }
        const settings = values;

        return NextResponse.json(settings);
    } catch (error) {
        console.log("[SETTINGS]", error);
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
