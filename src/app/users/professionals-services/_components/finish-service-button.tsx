"use client"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { endService } from "@/actions/end-service";
import { toast } from "sonner";
import { useState } from "react";

interface FinishServiceButtonProps {
    treatmentId: string;
}

const FinishServiceButton = ({ treatmentId }: FinishServiceButtonProps) => {
    const [error, setError] = useState<string | null>(null);
    const { execute, status } = useAction(endService, {
        onSuccess: (result) => {
            if (result.data?.error) {
                toast.error(result.data.error.message);
                setError(result.data.error.message);
                return;
            }
            toast.success("Atendimento finalizado com sucesso!");
            setError(null);
        },
        onError: (error) => {
            const msg = error.error?.serverError || error.error?.validationErrors?.treatmentId?._errors?.[0] || "Erro ao finalizar atendimento";
            toast.error(msg);
            setError(msg);
        },
    });

    return (
        <Button
            variant="default"
            disabled={status === "executing"}
            onClick={() => execute({ treatmentId })}
        >
            <BadgeCheck className="w-4 h-4" />
            Finalizar atendimento
        </Button>
    );
}

export default FinishServiceButton;