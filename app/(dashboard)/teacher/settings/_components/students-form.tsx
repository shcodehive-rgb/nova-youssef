"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash, UserPlus } from "lucide-react";
import { Course, CourseWhitelist } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { grantAccess, revokeAccess } from "@/actions/whitelist";

interface StudentsFormProps {
    courses: Course[];
    whitelist: (CourseWhitelist & { course: Course })[];
}

const formSchema = z.object({
    email: z.string().email("Email invalide"),
    courseId: z.string().min(1, "Sélectionnez un cours"),
});

export const StudentsForm = ({ courses, whitelist }: StudentsFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            courseId: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const result = await grantAccess(values.email, values.courseId);

            if (result.success) {
                toast.success("Accès accordé avec succès");
                form.reset({ ...form.getValues(), email: "" }); // Keep course selected
                router.refresh();
            } else {
                toast.error(result.error || "Erreur lors de l'ajout");
            }
        } catch {
            toast.error("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async (id: string, courseId: string) => {
        try {
            setDeletingId(id);
            const result = await revokeAccess(id, courseId);

            if (result.success) {
                toast.success("Accès révoqué");
                router.refresh();
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error("Erreur lors de la suppression");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900">
                <div className="font-medium text-lg mb-4 flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Ajouter un étudiant
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:flex md:space-y-0 md:gap-4 items-end">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Email de l'étudiant</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="etudiant@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="courseId"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Cours</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir un cours..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                    {course.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" className="w-full md:w-auto">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                            Accorder l'accès
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="rounded-xl border bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold">Étudiants Autorisés ({whitelist.length})</h3>
                </div>
                <div className="divide-y relative">
                    {whitelist.length === 0 && (
                        <div className="p-8 text-center text-slate-500 text-sm">
                            Aucun étudiant autorisé pour le moment.
                        </div>
                    )}
                    {whitelist.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                            <div className="flex flex-col">
                                <span className="font-medium text-slate-800">{item.email}</span>
                                <span className="text-xs text-slate-500">Cours: {item.course.title}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={deletingId === item.id}
                                onClick={() => onDelete(item.id, item.courseId)}
                            >
                                {deletingId === item.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
