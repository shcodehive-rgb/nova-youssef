"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { usePurchaseModal } from "@/hooks/use-purchase-modal";
import { cn } from "@/lib/utils";



interface VideoPlayerProps {
    playbackId?: string; // Mux specific, keeping optional for future
    videoUrl?: string;   // Direct URL from UploadThing (User preference)
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer = ({
    playbackId,
    videoUrl,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();
    const { onOpen } = usePurchaseModal();

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if (nextChapterId) {
                    router.push(`/learn/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && videoUrl && (
                <video
                    src={videoUrl}
                    className={cn(
                        "w-full h-full rounded-md",
                        // !isReady && "hidden" // Only hide if we have a thumbnail/poster to show, otherwise native video loader is fine
                    )}
                    controls
                    autoPlay
                    onLoadedData={() => setIsReady(true)}
                    onEnded={onEnd}
                />
            )}
            {!isLocked && !videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white">
                    No video available
                </div>
            )}
        </div>
    )
}
