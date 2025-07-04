"use client"
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { finishOperation } from "@/actions/finish-operation";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";

interface FinishOperationButtonProps {
    operationId: string;
}

const FinishOperationButton = ({ operationId }: FinishOperationButtonProps) => {
    const { execute, status } = useAction(finishOperation, {
        onSuccess: () => {
            toast.success("Operação encerrada com sucesso!");
        },
        onError: (error) => {
            const serverError = error.error?.serverError;
            let validationError = undefined;
            const validationErrors = error.error?.validationErrors;
            if (validationErrors && validationErrors.operationId && Array.isArray(validationErrors.operationId._errors)) {
                validationError = validationErrors.operationId._errors[0];
            }
            toast.error(serverError || validationError || "Erro ao encerrar operação.");
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