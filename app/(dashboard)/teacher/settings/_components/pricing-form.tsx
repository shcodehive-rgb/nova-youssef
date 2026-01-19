"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PricingPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createPricingPlan, deletePricingPlan } from "@/actions/pricing";
import { Plus, Trash, Check, Star } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title required" }),
    price: z.coerce.number().min(0),
    frequency: z.string().min(1, { message: "Frequency required (e.g. Month)" }),
    features: z.string().min(1, { message: "List features separated by new lines" }),
    url: z.string().optional(),
    isRecommended: z.boolean().default(false),
});

interface PricingFormProps {
    initialData: PricingPlan[]
}

export const PricingForm = ({ initialData }: PricingFormProps) => {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            price: 0,
            frequency: "Mois",
            features: "",
            url: "",
            isRecommended: false
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            await createPricingPlan(values);
            toast.success("Plan created");
            router.refresh();
            setIsCreating(false);
            form.reset();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await deletePricingPlan(id);
            toast.success("Plan deleted");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Plans Tarifaires</h2>
                <Button onClick={() => setIsCreating(!isCreating)} variant={isCreating ? "ghost" : "default"}>
                    {isCreating ? "Annuler" : <><Plus className="h-4 w-4 mr-2" /> Ajouter un plan</>}
                </Button>
            </div>

            {isCreating && (
                <div className="p-4 border rounded-md bg-slate-50 dark:bg-zinc-900">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titre du Pack</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="Ex: Pack Gold" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prix (DH)</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isLoading} placeholder="200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fréquence</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="Ex: /Mois, /An, Unique" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lien de Paiement (Optionnel)</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField
                                    control={form.control}
                                    name="features"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fonctionnalités (Une par ligne)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={isLoading}
                                                    placeholder="- Accès complet&#10;- Support 24/7&#10;- Certificat"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isRecommended"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 bg-white">
                                            <div className="space-y-0.5">
                                                <FormLabel>Recommandé</FormLabel>
                                                <CardDescription>Mettre en avant ce plan</CardDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full">
                                Sauvegarder
                            </Button>
                        </form>
                    </Form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialData.map((plan) => (
                    <Card key={plan.id} className={`relative ${plan.isRecommended ? "border-orange-500 shadow-md" : ""}`}>
                        {plan.isRecommended && (
                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md font-medium">
                                Recommandé
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-lg">
                                {plan.title}
                            </CardTitle>
                            <CardDescription>
                                <span className="text-2xl font-bold text-slate-900">{plan.price} DH</span>
                                <span className="text-slate-500 text-sm"> / {plan.frequency}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-slate-600">
                                {plan.features.split("\n").map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{feature.replace(/^- /, "")}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => onDelete(plan.id)}
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                disabled={isLoading}
                            >
                                <Trash className="h-4 w-4 mr-2" /> Supprimer
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
