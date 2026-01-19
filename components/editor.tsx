"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
};

// Lazy load for SSR issues
// Define it OUTSIDE the component to prevent re-creation on every render
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export const Editor = ({ onChange, value }: EditorProps) => {
    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
