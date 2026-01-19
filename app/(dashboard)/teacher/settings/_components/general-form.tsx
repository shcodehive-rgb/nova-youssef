"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { getSiteConfig, updateSiteConfig } from "@/actions/site-config";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
    // name: z.string().min(1, { message: "School name is required" }), // Deprecated in favor of dual logo
    name: z.string().optional(),
    logoUrl: z.string().optional(),

    logoText1: z.string().optional(),
    logoColor1: z.string().optional(),
    logoText2: z.string().optional(),
    logoColor2: z.string().optional(),

    contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

export const GeneralForm = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingLogo, setIsEditingLogo] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            logoUrl: "",
            logoText1: "",
            logoColor1: "#000000",
            logoText2: "",
            logoColor2: "#ea580c",
            contactEmail: "",
        },
    });

    useEffect(() => {
        const fetchConfig = async () => {
            if (!userId) return;
            const config = await getSiteConfig(userId);
            if (config) {
                form.reset({
                    name: config.name || "",
                    logoUrl: config.logoUrl || "",
                    logoText1: config.logoText1 || "",
                    logoColor1: config.logoColor1 || "#000000",
                    logoText2: config.logoText2 || "",
                    logoColor2: config.logoColor2 || "#ea580c",
                    contactEmail: config.contactEmail || "",
                });
            }
        }
        fetchConfig();
    }, [userId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const result = await updateSiteConfig({
                name: `${values.logoText1 || ""} ${values.logoText2 || ""}`.trim(), // Auto-generate legacy name
                logoUrl: values.logoUrl,
                logoText1: values.logoText1,
                logoColor1: values.logoColor1,
                logoText2: values.logoText2,
                logoColor2: values.logoColor2,
                contactEmail: values.contactEmail,
            });

            if (result.success) {
                toast.success("Paramètres généraux mis à jour");
                setIsEditingLogo(false);
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

                {/* Logo Section */}
                <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-zinc-900">
                    <div className="font-medium flex items-center justify-between">
                        Logo de l'école
                        <Button
                            type="button"
                            onClick={() => setIsEditingLogo((prev) => !prev)}
                            variant="ghost"
                            className="text-primary"
                        >
                            {isEditingLogo && (
                                <>Annuler</>
                            )}
                            {!isEditingLogo && !form.getValues("logoUrl") && (
                                <>
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Ajouter
                                </>
                            )}
                            {!isEditingLogo && form.getValues("logoUrl") && (
                                <>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Modifier
                                </>
                            )}
                        </Button>
                    </div>

                    {!isEditingLogo && (
                        !form.getValues("logoUrl") ? (
                            <div className="flex items-center justify-center h-24 w-24 bg-slate-100 rounded-md border border-dashed border-slate-300 mx-auto md:mx-0">
                                <ImageIcon className="h-8 w-8 text-slate-400" />
                            </div>
                        ) : (
                            <div className="relative h-24 w-24 mt-2 mx-auto md:mx-0">
                                <Image
                                    alt="Logo"
                                    fill
                                    className="object-cover rounded-md border"
                                    src={form.getValues("logoUrl") || ""}
                                />
                                <Button
                                    type="button"
                                    onClick={() => {
                                        form.setValue("logoUrl", "");
                                        form.handleSubmit(onSubmit)(); // Trigger save immediately
                                    }}
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-500 hover:bg-red-600 shadow-md"
                                    variant="destructive"
                                >
                                    <X className="h-4 w-4 text-white" />
                                </Button>
                            </div>
                        )
                    )}

                    {isEditingLogo && (
                        <div>
                            <FileUpload
                                endpoint="courseImage" // Reuse courseImage endpoint for now
                                onChange={(url) => {
                                    if (url) {
                                        form.setValue("logoUrl", url);
                                        setIsEditingLogo(false);
                                    }
                                }}
                            />
                            <div className="text-xs text-muted-foreground mt-4 text-center md:text-left">
                                Recommandé: Image carrée (ex: 500x500px)
                            </div>
                        </div>
                    )}
                </div>

                {/* Dual Brand Builder */}
                <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-zinc-900">
                    <div className="font-medium text-base mb-2">Constructeur de Logo (Texte)</div>
                    <div className="text-sm text-slate-500 mb-4">
                        Si vous n'utilisez pas d'image, personnalisez votre texte ici.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Part 1 */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="logoText1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Texte Partie 1</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Ex: Nova"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="logoColor1"
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
                                name="logoText2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Texte Partie 2</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Ex: Academy"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="logoColor2"
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

                    {/* Live Preview */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="text-sm font-medium mb-3 text-slate-500">Aperçu :</div>
                        <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg border border-dashed">
                            <div className="font-extrabold text-3xl tracking-tight">
                                <span style={{ color: form.watch("logoColor1") }}>{form.watch("logoText1") || "Nova"}</span>
                                <span style={{ color: form.watch("logoColor2") }}>{form.watch("logoText2") || "Academy"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Email Input */}
                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Email de Contact</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="prof@gmail.com"
                                    className="py-6 text-lg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
