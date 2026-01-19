"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogPost } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { updateBlogPost, deleteBlogPost } from "@/actions/blog";
import { Trash, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/FileUpload";
import { Switch } from "@/components/ui/switch";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().optional(),
    coverImage: z.string().optional(),
    slug: z.string().min(1, { message: "Slug is required" }),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional(),
    isPublished: z.boolean().default(false),
});

interface BlogPostFormProps {
    initialData: BlogPost;
}

export const BlogPostForm = ({ initialData }: BlogPostFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
            content: initialData.content || "",
            coverImage: initialData.coverImage || "",
            slug: initialData.slug,
            metaTitle: initialData.metaTitle || "",
            metaDescription: initialData.metaDescription || "",
            keywords: initialData.keywords || "",
            isPublished: initialData.isPublished,
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsUpdating(true);
            await updateBlogPost(initialData.id, values);
            toast.success("Post updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteBlogPost(initialData.id);
            toast.success("Post deleted");
            router.refresh();
            router.push("/teacher/blog");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-x-2">
                            <Link href="/teacher/blog">
                                <Button variant="ghost" type="button">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold">Edit Post</h1>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <ConfirmModal onConfirm={onDelete}>
                                <Button disabled={isSubmitting || isDeleting} variant="destructive" size="sm" type="button">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </ConfirmModal>
                            <Button disabled={!isValid || isSubmitting || isUpdating} type="submit">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content (2 cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Post Title" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Editor
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="border rounded-md p-4 bg-slate-50 mt-4">
                                <h3 className="font-semibold mb-2">Google Search Preview</h3>
                                <div className="bg-white p-4 rounded-md shadow-sm border">
                                    <div className="text-[#1a0dab] text-xl font-medium truncate cursor-pointer hover:underline">
                                        {form.watch("metaTitle") || form.watch("title") || "My Blog Post"}
                                    </div>
                                    <div className="text-[#006621] text-sm truncate flex items-center gap-1">
                                        <span className="bg-slate-200 rounded-full px-1 text-[10px] text-slate-600">Ad</span>
                                        {`novayoussef.com/blog/${form.watch("slug") || "post-url"}`}
                                    </div>
                                    <div className="text-[#545454] text-sm line-clamp-2 mt-1">
                                        {form.watch("metaDescription") || "No description provided."}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    This is a simulation of how your post might appear in Google search results.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar (1 col) */}
                        <div className="space-y-6">
                            {/* Publish Status */}
                            <FormField
                                control={form.control}
                                name="isPublished"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base font-semibold">Publish</FormLabel>
                                            <FormDescription>Make visible to students.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Cover Image */}
                            <FormField
                                control={form.control}
                                name="coverImage"
                                render={({ field }) => (
                                    <FormItem className="rounded-lg border p-4 bg-white shadow-sm">
                                        <FormLabel className="font-semibold">Cover Image</FormLabel>
                                        <FormDescription>Used for social sharing and blog list.</FormDescription>
                                        <FormControl>
                                            {field.value ? (
                                                <div className="relative aspect-video mt-2">
                                                    <Image
                                                        alt="Cover"
                                                        fill
                                                        className="object-cover rounded-md"
                                                        src={field.value}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                                                        onClick={() => field.onChange("")}
                                                    >
                                                        <Trash className="h-4 w-4 text-rose-500" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <FileUpload
                                                    endpoint="courseImage"
                                                    onChange={(url) => {
                                                        if (url) {
                                                            field.onChange(url);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* SEO Box */}
                            <div className="rounded-lg border p-4 space-y-4 bg-white shadow-sm">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <span>🔍</span> SEO Settings
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug (URL)</FormLabel>
                                            <FormControl>
                                                <Input disabled={isSubmitting} placeholder="my-awesome-post" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Unique identifier for the URL.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metaTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Title</FormLabel>
                                            <FormControl>
                                                <Input disabled={isSubmitting} placeholder="Blue Title in Google" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="metaDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Description</FormLabel>
                                            <FormControl>
                                                <Textarea disabled={isSubmitting} className="resize-none h-20" placeholder="Short summary..." {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="keywords"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Keywords</FormLabel>
                                            <FormControl>
                                                <Input disabled={isSubmitting} placeholder="math, calculus, tips" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Comma separated keywords.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
