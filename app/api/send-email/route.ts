import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Fetch the configured contact email (we can pick the first config available)
        const siteConfig = await db.siteConfig.findFirst();

        if (!siteConfig || !siteConfig.contactEmail) {
            console.log("No contact email configured in Settings.");
            // We can still return 200 to not break UX for user, but log it server side
        } else {
            console.log(`[EMAIL SENDING] To: ${siteConfig.contactEmail}`);
            console.log(`From: ${name} <${email}>`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
            // Here you would integrate Resend / Nodemailer
            // await resend.emails.send({ ... })
        }

        return NextResponse.json({ success: true, message: "Email sent (Simulated)" });

    } catch (error) {
        console.log("[SEND_EMAIL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
