import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        // Only the Main Owner (Super Admin) can assign roles
        if (userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { email } = body;

        if (!email) {
            return new NextResponse("Email required", { status: 400 });
        }

        const client = await clerkClient();

        // Find user by email
        const users = await client.users.getUserList({ emailAddress: [email] });

        if (users.data.length === 0) {
            return new NextResponse("User not found", { status: 404 });
        }

        const targetUser = users.data[0];

        // Update metadata
        await client.users.updateUserMetadata(targetUser.id, {
            publicMetadata: {
                role: "teacher"
            }
        });

        return NextResponse.json({
            success: true,
            message: `User ${email} promoted to Teacher`
        });

    } catch (error) {
        console.log("[ADMIN_SET_ROLE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
