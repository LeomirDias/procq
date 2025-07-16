"use client"
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { finishOperation } from "@/actions/finish-operation";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";

interface FinishOperationButtonProps {
    operationId: string;
}

const FinishOperationButton = ({ operationId }: FinishOperationButtonProps) => {
    const [error, setError] = useState<string | null>(null);
    const { execute, status } = useAction(finishOperation, {
        onSuccess: (result) => {
            if (result.data?.error) {
                toast.error(result.data.error.message);
                setError(result.data.error.message);
                return;
            }
            toast.success("Operação encerrada com sucesso!");
            setError(null);
        },
        onError: (err) => {
            const msg = err.error?.serverError || err.error?.validationErrors?.operationId?._errors?.[0] || "Erro ao encerrar operação";
            toast.error(msg);
            setError(msg);
        },
    });

    return (
        <Button
            variant="default"
            disabled={status === "executing"}
            onClick={() => execute({ operationId })}
        >
            <BadgeCheck className="w-4 h-4" />
            Finalizar operação
        </Button>
    );
};

export default FinishOperationButton;