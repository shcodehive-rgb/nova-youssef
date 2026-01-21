import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
    '/',
    '/tarifs(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook(.*)',
    '/search(.*)',
    '/learn(.*)', // Public course browsing
    '/api/uploadthing(.*)', // UploadThing config polling
]);

const isTeacherRoute = createRouteMatcher(['/teacher(.*)', '/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
    const { userId, sessionClaims } = await auth();

    // Protect all routes except public ones
    if (!isPublicRoute(request)) {
        await auth.protect();
    }

    // Strict Teacher Protection
    if (isTeacherRoute(request)) {
        // Check Role (Metadata or Public Metadata)
        // Note: You must configure Clerk JWT Template to include metadata if not present by default
        const role = (sessionClaims?.metadata as any)?.role || (sessionClaims as any)?.public_metadata?.role;
        const isSuperAdmin = userId === process.env.NEXT_PUBLIC_TEACHER_ID;

        if (role !== "teacher" && !isSuperAdmin) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
