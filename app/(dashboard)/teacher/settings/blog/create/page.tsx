"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/actions/blog";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/FileUpload";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
});

const CreatePostPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await createPost(values);

            if (response.success && response.data) {
                toast.success("Post created");
                router.push(`/teacher/settings/blog/${response.data.id}`);
            } else {
                toast.error(response.error || "Something went wrong");
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto h-full p-6 pt-24 relative z-[20]">
            <div className="bg-white p-8 rounded-lg border shadow-sm w-full max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Nouvel Article</h1>
                <p className="text-slate-500 mb-8">
                    Commencez par donner un titre à votre article.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Ex: Les meilleures astuces pour..."
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                // Auto-generate slug
                                                const slug = e.target.value.toLowerCase()
                                                    .replace(/[^a-z0-9]+/g, '-')
                                                    .replace(/^-|-$/g, '');
                                                form.setValue("slug", slug, { shouldValidate: true });
                                            }}
                                        />
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
                                    <FormLabel>Slug (URL)</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <span className="bg-slate-100 border border-r-0 rounded-l-md px-3 py-2 text-sm text-slate-500">
                                                /blog/
                                            </span>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="titre-article"
                                                className="rounded-l-none"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/teacher/settings/blog">
                                <Button type="button" variant="ghost">
                                    Annuler
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Création..." : "Continuer"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePostPage;
