"use client";

import { useEffect, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePurchaseModal } from "@/hooks/use-purchase-modal";

export const PurchaseModal = () => {
    const { isOpen, onClose, courseTitle } = usePurchaseModal();
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch settings when modal opens (or once mounted)
        const fetchSettings = async () => {
            try {
                const res = await axios.get("/api/settings");
                setSettings(res.data);
            } catch (error) {
                console.log("Failed to fetch settings");
            }
        };

        if (isOpen) {
            fetchSettings();
        }
    }, [isOpen]);

    const onCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }

    if (!isOpen) {
        return null;
    }

    const whatsappLink = `https://wa.me/${settings?.whatsappNumber?.replace('+', '')}?text=Salam, I paid for course: ${courseTitle || "Course"}. Here is the receipt.`;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Unlock Full Access</DialogTitle>
                    <DialogDescription>
                        Choose your preferred payment method below.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="bank" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                        <TabsTrigger value="cash">Cash Transfer</TabsTrigger>
                    </TabsList>

                    {/* Bank Transfer Tab */}
                    <TabsContent value="bank" className="space-y-4 pt-4">
                        <div className="bg-slate-100 p-4 rounded-md space-y-3">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase">Bank Name</p>
                                <p className="text-sm font-semibold text-slate-900">{settings?.bankName || "Not set"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase">Account Name</p>
                                <p className="text-sm font-semibold text-slate-900">{settings?.accountName || "Not set"}</p>
                            </div>
                            <div className="relative">
                                <p className="text-xs font-medium text-slate-500 uppercase">RIB (Account Number)</p>
                                <div className="flex items-center gap-x-2 bg-white p-2 rounded border mt-1">
                                    <code className="text-sm flex-1 font-mono tracking-wide">
                                        {settings?.bankRib || "Not set"}
                                    </code>
                                    {settings?.bankRib && (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onCopy(settings.bankRib!)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Cash Transfer Tab */}
                    <TabsContent value="cash" className="space-y-4 pt-4">
                        <div className="bg-slate-100 p-4 rounded-md space-y-3">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase">Service Provider</p>
                                <p className="text-sm font-semibold text-slate-900">CashPlus / Wafacash</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase">Beneficiary Name</p>
                                <p className="text-sm font-semibold text-slate-900">{settings?.cashPlusName || "Not set"}</p>
                            </div>
                            <div className="relative">
                                <p className="text-xs font-medium text-slate-500 uppercase">CIN Number</p>
                                <div className="flex items-center gap-x-2 bg-white p-2 rounded border mt-1">
                                    <code className="text-sm flex-1 font-mono tracking-wide">
                                        {settings?.cashPlusCin || "Not set"}
                                    </code>
                                    {settings?.cashPlusCin && (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onCopy(settings.cashPlusCin!)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="flex-col !space-x-0 !space-y-4 mt-4">
                    <div className="text-center text-xs text-muted-foreground w-full">
                        After payment, please send a photo of your receipt to activate your account.
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2"
                        onClick={() => window.open(whatsappLink, "_blank")}
                        disabled={!settings?.whatsappNumber}
                    >
                        <MessageCircle className="h-5 w-5" />
                        Send Receipt via WhatsApp
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
