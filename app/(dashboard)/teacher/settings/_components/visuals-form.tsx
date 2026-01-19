"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/FileUpload";
import { getSiteConfig, updateSiteConfig } from "@/actions/site-config";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
    heroTitle: z.string().min(1, {
        message: "Title is required",
    }),
    heroDescription: z.string().optional(),
    heroImageUrl: z.string().optional(),
});

export const VisualsForm = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            heroTitle: "",
            heroDescription: "",
            heroImageUrl: "",
        },
    });

    useEffect(() => {
        const fetchConfig = async () => {
            if (!userId) return;
            const config = await getSiteConfig(userId);
            if (config) {
                form.reset({
                    heroTitle: config.heroTitle || "",
                    heroDescription: config.heroDescription || "",
                    heroImageUrl: config.heroImageUrl || "",
                });
            }
        }
        fetchConfig();
    }, [userId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const result = await updateSiteConfig({
                heroTitle: values.heroTitle,
                heroDescription: values.heroDescription,
                heroImageUrl: values.heroImageUrl,
            });

            if (result.success) {
                toast.success("Page d'accueil mise à jour");
                setIsEditingImage(false);
                router.refresh();
            } else {
                toast.error(`Erreur: ${result.error}`);
            }
        } catch {
            toast.error("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Hero Image */}
                <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-zinc-900">
                    <div className="font-medium flex items-center justify-between">
                        Image Hero
                        <Button
                            onClick={() => setIsEditingImage((prev) => !prev)}
                            variant="ghost"
                            className="text-primary"
                        >
                            {isEditingImage && (
                                <>Annuler</>
                            )}
                            {!isEditingImage && !form.getValues("heroImageUrl") && (
                                <>
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Ajouter
                                </>
                            )}
                            {!isEditingImage && form.getValues("heroImageUrl") && (
                                <>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Modifier
                                </>
                            )}
                        </Button>
                    </div>

                    {!isEditingImage && (
                        !form.getValues("heroImageUrl") ? (
                            <div className="flex items-center justify-center h-48 bg-slate-100 rounded-md">
                                <ImageIcon className="h-10 w-10 text-slate-500" />
                            </div>
                        ) : (
                            <div className="relative aspect-video mt-2">
                                <Image
                                    alt="Hero"
                                    fill
                                    className="object-cover rounded-md"
                                    src={form.getValues("heroImageUrl") || ""}
                                />
                            </div>
                        )
                    )}

                    {isEditingImage && (
                        <div>
                            <FileUpload
                                endpoint="courseImage"
                                onChange={(url) => {
                                    if (url) {
                                        form.setValue("heroImageUrl", url);
                                        // Auto-submit or just let user click save? 
                                        // Let's keep it simple and just update form state, user must click save.
                                        setIsEditingImage(false);
                                    }
                                }}
                            />
                            <div className="text-xs text-muted-foreground mt-4">
                                Recommandé: 16:9 aspect ratio
                            </div>
                        </div>
                    )}
                </div>

                {/* Text Fields */}
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="heroTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Titre Principal</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Lancez votre académie..."
                                        className="py-6 text-lg font-bold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="heroDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Sous-titre</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isLoading}
                                        placeholder="Une description courte et accrocheuse..."
                                        className="text-lg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Fixed Mobile Save Button */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50 md:static md:bg-transparent md:border-none md:p-0">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full md:w-auto text-lg py-6"
                    >
                        Enregistrer
                    </Button>
                </div>
            </form>
        </Form>
    );
};
