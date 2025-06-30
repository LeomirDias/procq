"use client";
import { useEffect, useState } from "react";

interface ClientOperationTimerCardProps {
    createdAt: Date | string;
    status?: string;
}

function formatDuration(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
}

const ClientOperationTimerCard = ({ createdAt, status }: ClientOperationTimerCardProps) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const created = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
        function update() {
            setElapsed(Math.floor((Date.now() - created.getTime()) / 1000));
        }
        update();
        let interval: NodeJS.Timeout | undefined;
        if (status !== "finished") {
            interval = setInterval(update, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [createdAt, status]);

    return (
        <p className="flex items-center gap-1">
            <span className="text-xs text-green-600">{formatDuration(elapsed)}</span>
        </p>
    );
};

export default ClientOperationTimerCard; 