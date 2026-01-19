"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Page } from "@prisma/client";
import { ArrowLeft, Loader2, Save, Trash } from "lucide-react";
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
import { deletePage, updatePage } from "@/actions/page";
import { ConfirmModal } from "@/components/modals/confirm-modal"; // Assuming exists, otherwise create or use simple confirm
import { Switch } from "@/components/ui/switch"; // Assuming ShadCN switch exists

const formSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    content: z.string().min(1, "Content is required"),
    isPublished: z.boolean(),
});

interface PageFormProps {
    initialData: Page;
}

export const PageForm = ({ initialData }: PageFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: initialData.title,
            slug: initialData.slug,
            content: initialData.content,
            isPublished: initialData.isPublished || false
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await updatePage(initialData.id, values);
            if (response.success) {
                toast.success("Page updated");
                router.refresh();
            } else {
                toast.error("Error updating page");
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deletePage(initialData.id);
            if (response.success) {
                toast.success("Page deleted");
                router.refresh();
                router.push("/teacher/settings/pages");
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
                    <Link href="/teacher/settings/pages" className="hover:text-slate-700">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <span>Back to pages</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button
                        onClick={onDelete}
                        disabled={isDeleting || isSubmitting}
                        variant="destructive"
                        size="sm"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-md mb-6">
                <h1 className="text-2xl font-bold">Modifier la page</h1>
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
                                            <Input disabled={isSubmitting} placeholder="Titre de la page" {...field} />
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
                                        <FormDescription>Path: /pages/{field.value}</FormDescription>
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
                                                Rendre cette page visible publiquement.
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
