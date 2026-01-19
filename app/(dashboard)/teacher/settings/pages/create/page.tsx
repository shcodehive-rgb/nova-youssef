"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import { createPage } from "@/actions/page";
import Link from "next/link";
import { Editor } from "@/components/editor";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
    content: z.string().min(1, "Content is required"),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            content: ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await createPage({
                ...values,
                isPublished: false
            });

            if (response.success && response.data) {
                toast.success("Page created");
                router.push(`/teacher/settings/pages/${response.data.id}`);
            } else {
                toast.error(response.error || "Something went wrong");
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div className="bg-white p-8 rounded-lg border shadow-sm w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Nommez votre page</h1>
                <p className="text-slate-500 mb-8">
                    Donnez un titre, une URL et ajoutez du contenu à votre nouvelle page.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titre de la page</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Ex: Qui sommes-nous ?"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    // Auto-generate slug from title if slug is empty or untouched
                                                    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                                    form.setValue("slug", slug);
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
                                                    /pages/
                                                </span>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="qui-sommes-nous"
                                                    className="rounded-l-none"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            L'adresse unique de votre page.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contenu</FormLabel>
                                    <FormControl>
                                        <Editor
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/teacher/settings/pages">
                                <Button type="button" variant="ghost">
                                    Annuler
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continuer
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;
