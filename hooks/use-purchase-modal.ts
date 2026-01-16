"use client";

import { create } from "zustand";

type PurchaseModalStore = {
    isOpen: boolean;
    onOpen: (courseId: string, courseTitle: string) => void;
    onClose: () => void;
    courseId?: string;
    courseTitle?: string;
};

export const usePurchaseModal = create<PurchaseModalStore>((set) => ({
    isOpen: false,
    courseId: undefined,
    courseTitle: undefined,
    onOpen: (courseId = "", courseTitle = "") => set({ isOpen: true, courseId, courseTitle }),
    onClose: () => set({ isOpen: false, courseId: undefined, courseTitle: undefined }),
}));
