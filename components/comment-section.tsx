"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Comment {
    id: string;
    text: string;
    userId: string;
    userEmail?: string;
    createdAt: string;
    isTeacher?: boolean;
}

interface CommentSectionProps {
    courseId: string;
    chapterId: string;
}

export const CommentSection = ({
    courseId,
    chapterId
}: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.log("Failed to fetch comments");
        }
    }

    useEffect(() => {
        fetchComments();
    }, [chapterId, courseId]);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/comments`, {
                text: newComment
            });
            toast.success("Comment added");
            setNewComment("");
            fetchComments();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-xl font-bold">Discussion</h3>
                <div className="flex flex-col gap-y-2">
                    <Textarea
                        placeholder="Ask a question or share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={onSubmit}
                            disabled={!newComment || isLoading}
                            size="sm"
                        >
                            Post Comment
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className={`flex gap-x-4 p-4 border rounded-md ${comment.isTeacher
                            ? "bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900"
                            : "bg-slate-50 dark:bg-slate-900"
                            }`}
                    >
                        <div className="flex-shrink-0">
                            <div className={`p-2 rounded-full ${comment.isTeacher ? "bg-indigo-100 dark:bg-indigo-900" : "bg-slate-200 dark:bg-slate-800"}`}>
                                <User className={`h-6 w-6 ${comment.isTeacher ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-2 mb-1">
                                <span className={`font-semibold text-sm ${comment.isTeacher ? "text-indigo-700 dark:text-indigo-400" : ""}`}>
                                    {comment.userEmail?.split('@')[0] || "Étudiant"}
                                </span>
                                {comment.isTeacher && (
                                    <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">
                                        Professeur
                                    </span>
                                )}
                                <span className="text-xs text-slate-500 ml-auto">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">
                        No comments yet. Be the first to start the discussion!
                    </p>
                )}
            </div>
        </div>
    )
}
