"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from 'lucide-react';

interface PaymentModalProps {
    courseTitle: string;
    price: number;
}

export const PaymentModal = ({ courseTitle, price }: PaymentModalProps) => {
    const whatsappNumber = "212600000000"; // Placeholder
    const message = `Hello, I want to buy course: ${courseTitle}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg">
                    Buy Course for {price} DH
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-slate-900">
                        Unlock Full Access 🔓
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-500 pt-2">
                        Payment via Wafacash / Bank Transfer
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center space-y-2">
                        <p className="text-sm font-medium text-slate-600">Transfer <span className="text-slate-900 font-bold">{price} DH</span> to:</p>
                        <div className="p-3 bg-white rounded border border-slate-200 font-mono text-sm tracking-wider select-all">
                            123 456 789 000 000 0000 (RIB)
                        </div>
                        <p className="text-xs text-slate-400">Account: Nova Academy</p>
                    </div>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12"
                        onClick={() => window.open(whatsappUrl, '_blank')}
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Send Receipt via WhatsApp
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
