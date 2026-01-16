"use client";

import { useMemo } from "react";
// import dynamic from "next/dynamic";

// import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    value: string;
};

export const Preview = ({
    value,
}: PreviewProps) => {
    // If we had react-quill, we would use it here.
    // For now, we'll render HTML simply since we're using standard setup.
    // Assuming value is HTML from a Rich Text Editor.

    // const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return (
        <div className="prose dark:prose-invert max-w-none p-4 bg-white dark:bg-zinc-900 rounded-md border border-slate-200 dark:border-zinc-800">
            {/* Fallback for now: Basic HTML render */}
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
};
