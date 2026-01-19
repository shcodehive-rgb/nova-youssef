"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BlogPost } from "@prisma/client";
import { ArrowLeft, Save, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/FileUpload";
import { updatePost, deletePost } from "@/actions/blog";
import { Switch } from "@/components/ui/switch";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const formSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    content: z.string().optional(),
    coverImageUrl: z.string().optional(),
    isPublished: z.boolean().default(false),
});

interface PostFormProps {
    initialData: BlogPost;
}

export const PostForm = ({ initialData }: PostFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
            slug: initialData.slug,
            content: initialData.content || "",
            coverImageUrl: initialData.coverImageUrl || "",
            isPublished: initialData.isPublished
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await updatePost(initialData.id, values);
            if (response.success) {
                toast.success("Article updated");
                router.refresh();
            } else {
                toast.error("Error updating article");
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deletePost(initialData.id);
            if (response.success) {
                toast.success("Article deleted");
                router.refresh();
                router.push("/teacher/settings/blog");
            } else {
                toast.error("Failed to delete");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-x-2 text-sm text-slate-500">
                    <Link href="/teacher/settings/blog" className="hover:text-slate-700">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <span>Retour</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <ConfirmModal onConfirm={onDelete}>
                        <Button
                            disabled={isDeleting || isSubmitting}
                            variant="destructive"
                            size="sm"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </ConfirmModal>
                </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-md mb-6">
                <h1 className="text-2xl font-bold">Modifier l'article</h1>
                <p className="text-sm text-slate-500">
                    ID: {initialData.id}
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Titre de l'article" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="slug-url" {...field} />
                                        </FormControl>
                                        <FormDescription>URL: /blog/{field.value}</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coverImageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image de couverture</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="courseImage"
                                                value={field.value}
                                                onChange={(url) => {
                                                    if (url) {
                                                        field.onChange(url);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Cette image apparaîtra en haut de l'article et dans les aperçus.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isPublished"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-white">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Publier
                                            </FormLabel>
                                            <FormDescription>
                                                Rendre cet article visible publiquement.
                                            </FormDescription>
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
                        </div>
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contenu</FormLabel>
                                        <FormControl>
                                            <Editor
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" disabled={!isValid || isSubmitting}>
                            <Save className="h-4 w-4 mr-2" />
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
