"use client";

import { useEffect, useState } from "react";

import { PurchaseModal } from "@/components/modals/purchase-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PurchaseModal />
        </>
    )
}
