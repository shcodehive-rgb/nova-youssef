"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


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

interface SettingsFormProps {
    initialData: any; // SiteSettings not in Prisma client yet
};

const formSchema = z.object({
    bankName: z.string().optional(),
    bankRib: z.string().optional(),
    accountName: z.string().optional(),
    cashPlusName: z.string().optional(),
    cashPlusCin: z.string().optional(),
    whatsappNumber: z.string().optional(),
});

export const SettingsForm = ({
    initialData,
}: SettingsFormProps) => {
    const router = useRouter();

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bankName: initialData?.bankName || "",
            bankRib: initialData?.bankRib || "",
            accountName: initialData?.accountName || "",
            cashPlusName: initialData?.cashPlusName || "",
            cashPlusCin: initialData?.cashPlusCin || "",
            whatsappNumber: initialData?.whatsappNumber || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/settings`, values);
            toast.success("Settings updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100/50 rounded-md p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-medium text-lg">Bank Transfer (CIH/Bank)</h3>
                            <FormField
                                control={form.control}
                                name="bankName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g. CIH Bank"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accountName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Beneficiary Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g. Amina Youssef"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bankRib"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RIB (24 Digits)</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g. 230..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-lg">Cash Transfer (Wafacash/CashPlus)</h3>
                            <FormField
                                control={form.control}
                                name="cashPlusName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Beneficiary Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g. Amina Youssef"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cashPlusCin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CIN Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g. BH123456"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="font-medium text-lg mb-4">Contact & Receipts</h3>
                        <FormField
                            control={form.control}
                            name="whatsappNumber"
                            render={({ field }) => (
                                <FormItem className="max-w-md">
                                    <FormLabel>WhatsApp Number (International Format)</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 212612345678"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Settings
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
