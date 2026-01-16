"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, Plus, File, Loader2, X, Download, Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ChapterAttachmentFormProps {
    initialData: Chapter & { attachments: (Attachment & { canDownload?: boolean })[] };
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    url: z.string().min(1),
    name: z.string().optional(),
});

export const ChapterAttachmentForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/attachments`, values);
            toast.success("Attachment added");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    const onDelete = async (attachmentId: string) => {
        try {
            setDeletingId(attachmentId);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/attachments/${attachmentId}`);
            toast.success("Attachment deleted");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setDeletingId(null);
        }
    }

    const onToggleDownload = async (attachmentId: string, currentStatus: boolean) => {
        try {
            setTogglingId(attachmentId);
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/attachments/${attachmentId}`, {
                canDownload: !currentStatus
            });
            toast.success("Permission updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setTogglingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter attachments (PDFs/Files)
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-xs line-clamp-1 w-full">
                                        {attachment.name}
                                    </p>

                                    {/* Download Permission Toggle */}
                                    <div className="flex items-center gap-x-2 ml-auto mr-4">
                                        {togglingId === attachment.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                {attachment.canDownload ? (
                                                    <Download className="h-3 w-3 text-emerald-600" />
                                                ) : (
                                                    <Eye className="h-3 w-3 text-amber-600" />
                                                )}
                                                <Switch
                                                    checked={attachment.canDownload}
                                                    onCheckedChange={() => onToggleDownload(attachment.id, !!attachment.canDownload)}
                                                    className="h-4 w-7"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {deletingId === attachment.id && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {deletingId !== attachment.id && (
                                        <button
                                            onClick={() => onDelete(attachment.id)}
                                            className="ml-auto hover:opacity-75 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your students might need to complete the chapter.
                    </div>
                </div>
            )}
        </div>
    )
}
