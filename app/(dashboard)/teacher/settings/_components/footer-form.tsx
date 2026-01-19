"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash, Save, Loader2, Link as LinkIcon, Columns, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { getSiteConfig, updateSiteConfig } from "@/actions/site-config";
import { Separator } from "@/components/ui/separator";

// Schema for a single link
const linkSchema = z.object({
    label: z.string().min(1, "Label required"),
    url: z.string().min(1, "URL required"),
});

// Schema for a column of links
const columnSchema = z.object({
    header: z.string().min(1, "Header required"),
    links: z.array(linkSchema)
});

const formSchema = z.object({
    footerText: z.string().optional(),
    footerCopyright: z.string().optional(),
    footerLogoUrl: z.string().optional(),
    footerBrandName: z.string().optional(),

    footerLogoText1: z.string().optional(),
    footerLogoColor1: z.string().optional(),
    footerLogoText2: z.string().optional(),
    footerLogoColor2: z.string().optional(),

    footerLinks: z.array(columnSchema)
});

export const FooterForm = () => {
    const { userId } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingLogo, setIsEditingLogo] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            footerText: "",
            footerCopyright: "",
            footerLogoUrl: "",
            footerBrandName: "",
            footerLogoText1: "",
            footerLogoColor1: "#ffffff",
            footerLogoText2: "",
            footerLogoColor2: "#ea580c",
            footerLinks: [],
        }
    });

    const { fields: columnFields, append: appendColumn, remove: removeColumn } = useFieldArray({
        control: form.control,
        name: "footerLinks",
    });

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        const fetchConfig = async () => {
            if (!userId) return;
            try {
                const config = await getSiteConfig(userId);
                if (config) {
                    form.reset({
                        footerText: config.footerText || "",
                        footerCopyright: config.footerCopyright || "",
                        footerLogoUrl: config.footerLogoUrl || "",
                        footerBrandName: config.footerBrandName || "",
                        footerLogoText1: config.footerLogoText1 || "",
                        footerLogoColor1: config.footerLogoColor1 || "#ffffff",
                        footerLogoText2: config.footerLogoText2 || "",
                        footerLogoColor2: config.footerLogoColor2 || "#ea580c",
                        footerLinks: config.footerLinks ? (config.footerLinks as any) : []
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
                footerText: values.footerText,
                footerCopyright: values.footerCopyright,
                footerLogoUrl: values.footerLogoUrl,
                footerBrandName: `${values.footerLogoText1 || ""} ${values.footerLogoText2 || ""}`.trim(), // Legacy fallback
                footerLogoText1: values.footerLogoText1,
                footerLogoColor1: values.footerLogoColor1,
                footerLogoText2: values.footerLogoText2,
                footerLogoColor2: values.footerLogoColor2,
                footerLinks: values.footerLinks
            });

            if (result.success) {
                toast.success("Footer settings updated");
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
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Visual Identity Section */}
                    <div className="border bg-white dark:bg-zinc-900 rounded-md p-4 space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Identité Visuelle
                        </h3>

                        {/* Footer Logo */}
                        <div className="space-y-4 rounded-lg border p-4 bg-slate-50 dark:bg-zinc-950/50">
                            <div className="font-medium text-sm flex items-center justify-between">
                                Logo du Pied de Page
                                <Button
                                    type="button"
                                    onClick={() => setIsEditingLogo((prev) => !prev)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary h-8"
                                >
                                    {isEditingLogo ? "Annuler" : (!form.getValues("footerLogoUrl") ? "Ajouter" : "Modifier")}
                                </Button>
                            </div>

                            {!isEditingLogo && (
                                !form.getValues("footerLogoUrl") ? (
                                    <div className="text-xs text-slate-500 italic">Aucun logo défini.</div>
                                ) : (
                                    <div className="relative h-12 w-12">
                                        <Image
                                            alt="Footer Logo"
                                            fill
                                            className="object-contain"
                                            src={form.getValues("footerLogoUrl") || ""}
                                        />
                                    </div>
                                )
                            )}

                            {isEditingLogo && (
                                <div>
                                    <FileUpload
                                        endpoint="courseImage"
                                        onChange={(url) => {
                                            if (url) {
                                                form.setValue("footerLogoUrl", url);
                                                setIsEditingLogo(false);
                                            }
                                        }}
                                    />
                                    <div className="text-xs text-muted-foreground mt-2">
                                        Recommandé: Image PNG transparente (blanc ou couleur).
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dual Brand Builder (Footer) */}
                        <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-zinc-900">
                            <div className="font-medium text-base mb-2">Constructeur de Marque (Pied de Page)</div>
                            <div className="text-sm text-slate-500 mb-4">
                                Personnalisez les couleurs pour le fond sombre du pied de page.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Part 1 */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="footerLogoText1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Texte Partie 1</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} placeholder="Ex: Nova" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="footerLogoColor1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Couleur Partie 1</FormLabel>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full border shadow-sm"
                                                        style={{ backgroundColor: field.value }}
                                                    />
                                                    <FormControl>
                                                        <Input
                                                            type="color"
                                                            disabled={isLoading}
                                                            className="w-20 h-10 p-1 cursor-pointer"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Part 2 */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="footerLogoText2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Texte Partie 2</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} placeholder="Ex: Academy" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="footerLogoColor2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Couleur Partie 2</FormLabel>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full border shadow-sm"
                                                        style={{ backgroundColor: field.value }}
                                                    />
                                                    <FormControl>
                                                        <Input
                                                            type="color"
                                                            disabled={isLoading}
                                                            className="w-20 h-10 p-1 cursor-pointer"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Dark Mode Live Preview */}
                            <div className="mt-6 pt-6 border-t">
                                <div className="text-sm font-medium mb-3 text-slate-500">Aperçu (Sur fond sombre) :</div>
                                <div className="flex items-center justify-center p-8 bg-slate-900 rounded-lg border border-slate-700">
                                    <div className="font-extrabold text-3xl tracking-tight">
                                        <span style={{ color: form.watch("footerLogoColor1") }}>{form.watch("footerLogoText1") || "Nova"}</span>
                                        <span style={{ color: form.watch("footerLogoColor2") }}>{form.watch("footerLogoText2") || "Academy"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> {/* Closing Visual Identity Section */}

                    {/* Global Content Section */}
                    <div className="border bg-slate-100 dark:bg-zinc-900 rounded-md p-4">
                        <h3 className="font-medium mb-4 flex items-center gap-2">
                            <Columns className="h-4 w-4" />
                            Contenu Global
                        </h3>
                        <FormField
                            control={form.control}
                            name="footerText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (sous le logo)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="Ex: Empowering the next generation..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4">
                            <FormField
                                control={form.control}
                                name="footerCopyright"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copyright Text</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="© 2026 Nova Academy. All rights reserved."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator className="my-6" />

                        <div className="flex items-center justify-between mb-4">
                            <FormLabel className="text-base font-semibold">Colonnes de Navigation</FormLabel>
                            <Button
                                type="button"
                                onClick={() => appendColumn({ header: "Nouvelle Colonne", links: [] })}
                                variant="outline"
                                size="sm"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter Colonne
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {columnFields.map((column, columnIndex) => (
                                <div key={column.id} className="bg-white dark:bg-zinc-950 p-4 rounded-md border shadow-sm space-y-4">
                                    <div className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name={`footerLinks.${columnIndex}.header`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            disabled={isSubmitting}
                                                            placeholder="Titre Colonne"
                                                            className="font-bold"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeColumn(columnIndex)}
                                        >
                                            <Trash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>

                                    {/* Nested Links */}
                                    <LinksList
                                        nestIndex={columnIndex}
                                        control={form.control}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
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

// Sub-component for nested field array (Links inside Columns)
const LinksList = ({ nestIndex, control, isSubmitting }: { nestIndex: number, control: any, isSubmitting: boolean }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `footerLinks.${nestIndex}.links`
    });

    return (
        <div className="space-y-2 pl-2 border-l-2 border-slate-100">
            {fields.map((field, k) => (
                <div key={field.id} className="flex items-center gap-2">
                    <FormField
                        control={control}
                        name={`footerLinks.${nestIndex}.links.${k}.label`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="Label" {...field} disabled={isSubmitting} className="h-8 text-xs" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`footerLinks.${nestIndex}.links.${k}.url`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="/url" {...field} disabled={isSubmitting} className="h-8 text-xs font-mono" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => remove(k)}
                    >
                        <Trash className="h-3 w-3" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full text-xs border-dashed border"
                onClick={() => append({ label: "", url: "" })}
            >
                <Plus className="h-3 w-3 mr-1" /> Ajouter Lien
            </Button>
        </div>
    );
};
