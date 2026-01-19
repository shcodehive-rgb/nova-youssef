"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";
import Image from "next/image";
import { X } from "lucide-react";

interface MultiFileUploadProps {
    onChange: (urls: string[]) => void;
    value: string[];
    endpoint: keyof typeof ourFileRouter;
}

export const MultiFileUpload = ({
    onChange,
    value,
    endpoint
}: MultiFileUploadProps) => {
    return (
        <div className="space-y-4">
            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {value.map((url) => (
                    <div key={url} className="relative aspect-video rounded-md overflow-hidden border">
                        <Image
                            fill
                            src={url}
                            alt="Upload"
                            className="object-cover"
                        />
                        <button
                            onClick={() => onChange(value.filter((current) => current !== url))}
                            className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-full shadow-sm hover:bg-rose-600 transition"
                            type="button"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>

            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    const newUrls = res?.map((file) => file.url) || [];
                    onChange([...value, ...newUrls]);
                    toast.success("Images uploaded");
                }}
                onUploadError={(error: Error) => {
                    toast.error(`${error?.message}`);
                }}
                appearance={{
                    label: "text-slate-800 hover:text-slate-900",
                    allowedContent: "text-slate-600",
                }}
            />
        </div>
    )
}
