"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseWhitelist } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

import { grantAccess, revokeAccess } from "@/actions/whitelist";

interface AccessFormProps {
    courseId: string;
    whitelist: CourseWhitelist[];
}

const formSchema = z.object({
    email: z.string().email().min(1),
});

export const AccessForm = ({
    courseId,
    whitelist
}: AccessFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await grantAccess(values.email, courseId);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Acces donné avec succès");
                form.reset();
                router.refresh();
            }
        } catch {
            toast.error("Une erreur s'est produite");
        }
    };

    const onDelete = async (id: string) => {
        try {
            setIsDeleting(id);
            const result = await revokeAccess(id, courseId);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Accès retiré");
                router.refresh();
            }
        } catch {
            toast.error("Une erreur s'est produite");
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-4">
                Gestion des Accès Élèves (Manuel)
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col md:flex-row gap-4 items-start mb-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Email de l'étudiant (ex: etudiant@gmail.com)"
                                        {...field}
                                        className="bg-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        className="w-full md:w-auto min-w-[150px]"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Donner l&apos;accès
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            {/* List of Whitelisted Users */}
            {whitelist && whitelist.length > 0 ? (
                <div className="space-y-2">
                    {whitelist.map((item) => (
                        <div
                            key={item.id}
                            className="text-sm p-3 bg-white border border-slate-200 rounded-md flex items-center justify-between shadow-sm"
                        >
                            <span className="truncate">{item.email}</span>
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs text-slate-500 hidden sm:inline">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                <Button
                                    onClick={() => onDelete(item.id)}
                                    variant="ghost"
                                    size="sm"
                                    disabled={isDeleting === item.id}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    {isDeleting === item.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-slate-500 italic">
                    Aucun étudiant n&apos;a reçu d&apos;accès manuel pour le moment.
                </p>
            )}
        </div>
    );
}
