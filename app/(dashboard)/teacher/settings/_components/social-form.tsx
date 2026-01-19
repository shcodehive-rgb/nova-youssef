"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash, Save, Loader2, Link as LinkIcon } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { getSiteConfig, updateSiteConfig } from "@/actions/site-config";

const formSchema = z.object({
    socialLinks: z.array(z.object({
        label: z.string().min(1, "Label required"),
        url: z.string().url("Valid URL required").min(1, "URL required"),
    }))
});

export const SocialForm = () => {
    const { userId } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            socialLinks: [],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socialLinks",
    });

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        const fetchConfig = async () => {
            if (!userId) return;
            try {
                const config = await getSiteConfig(userId);
                if (config?.socialLinks) {
                    // Start with explicit type assertion for safety, though Zod handles validation on submit
                    const links = config.socialLinks as { label: string; url: string }[];

                    // Reset form with fetched data
                    // We need to use reset to populate the field array correctly
                    form.reset({
                        socialLinks: links.length > 0 ? links : []
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load settings");
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, [userId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await updateSiteConfig({
                socialLinks: values.socialLinks
            });

            if (result.success) {
                toast.success("Social links updated");
                router.refresh();
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
            </div>
        );
    }

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-zinc-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-4">
                <span>Mes Réseaux Sociaux</span>
                <Button
                    onClick={() => append({ label: "", url: "" })}
                    variant="ghost"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-white dark:bg-zinc-950 p-3 rounded-md border shadow-sm">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name={`socialLinks.${index}.label`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="Platform (e.g. YouTube)"
                                                        className="pl-8"
                                                        {...field}
                                                    />
                                                    <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`socialLinks.${index}.url`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="https://..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                                className="shrink-0"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    {fields.length === 0 && (
                        <div className="text-center py-6 text-slate-500 text-sm italic border-2 border-dashed rounded-md">
                            Aucun lien ajouté. Cliquez sur "Ajouter" pour commencer.
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
