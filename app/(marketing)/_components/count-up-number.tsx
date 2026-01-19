"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}

export const CountUpNumber = ({ end, duration = 2, prefix = "", suffix = "" }: CountUpNumberProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
            let startTime: number | null = null;
            const startValue = 0;

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / (duration * 1000), 1);

                // Ease-out cubic function for smooth deceleration
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(easeOut * (end - startValue) + startValue);

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration, hasAnimated]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
};
