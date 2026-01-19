"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SiteConfig } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateSiteConfig } from "@/actions/site-config";
import { MultiFileUpload } from "@/components/multi-file-upload";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    resultsImages: z.array(z.string()).min(1, { message: "Upload at least one image" })
});

interface ResultsFormProps {
    initialData: SiteConfig;
}

export const ResultsForm = ({ initialData }: ResultsFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    // Safety check for array, default to empty
    const initialImages = initialData.resultsImages || [];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            resultsImages: initialImages
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateSiteConfig(values);
            toast.success("Settings updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="rounded-md border bg-slate-100 dark:bg-zinc-900 p-4">
            <div className="font-medium flex items-center justify-between mb-4">
                Grandes Réussites (Carousel)
            </div>
            <div className="text-sm text-slate-500 mb-6">
                Téléchargez les captures d'écran des résultats ou témoignages de vos étudiants. Elles s'afficheront dans un carousel défilant sur la page d'accueil.
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="resultsImages"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <MultiFileUpload
                                        endpoint="resultsImages"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button disabled={!isValid || isSubmitting} type="submit">
                            Sauvegarder
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
