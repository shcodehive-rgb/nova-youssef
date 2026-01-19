"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
    value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        toast.success("Copied to clipboard");

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    return (
        <Button onClick={onCopy} size="sm" variant="ghost">
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
    );
}
