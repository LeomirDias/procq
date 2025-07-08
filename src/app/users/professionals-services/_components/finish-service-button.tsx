"use client"
import { Button } from "@/components/ui/button"
import { BadgeCheck } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { endService } from "@/actions/end-service";
import { toast } from "sonner";

interface FinishServiceButtonProps {
    treatmentId: string;
}

const FinishServiceButton = ({ treatmentId }: FinishServiceButtonProps) => {
    const { execute, status } = useAction(endService, {
        onSuccess: () => {
            toast.success("Atendimento finalizado com sucesso!");
        },
        onError: (error) => {
            const serverError = error.error?.serverError;
            let validationError = undefined;
            const validationErrors = error.error?.validationErrors;
            if (validationErrors && validationErrors.treatmentId && Array.isArray(validationErrors.treatmentId._errors)) {
                validationError = validationErrors.treatmentId._errors[0];
            }
            toast.error(serverError || validationError || "Erro ao finalizar atendimento.");
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