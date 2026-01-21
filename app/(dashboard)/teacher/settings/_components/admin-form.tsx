"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import axios from "axios";

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

const formSchema = z.object({
    email: z.string().email("Email invalide"),
});

export const AdminForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/admin/set-role", values);

            if (response.data.success) {
                toast.success(response.data.message);
                form.reset();
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.response?.data || "Erreur lors de la promotion");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 border-red-100">
                <div className="font-medium text-lg mb-4 flex items-center gap-2 text-red-600">
                    <ShieldCheck className="h-5 w-5" />
                    Zone Super Admin
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:flex md:space-y-0 md:gap-4 items-end">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Email de l'utilisateur à promouvoir</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="nouveau.prof@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Cet utilisateur aura accès au Tableau de Bord (Teacher).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
                            Promouvoir en Professeur
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
