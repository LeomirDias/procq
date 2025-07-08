"use client"
import { SmilePlus } from "lucide-react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { callNextTicket } from "@/actions/call-next-client";
import { toast } from "sonner";

interface CallNextTicketButtonProps {
    disabled?: boolean;
}

const CallNextTicketButton = ({ disabled }: CallNextTicketButtonProps) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { execute, status } = useAction(callNextTicket, {
        onSuccess: () => {
            toast.success("Atendimento iniciado com sucesso!");
            setError(null);
        },
        onError: (err) => {
            let msg = err.error?.serverError || (err.error?.validationErrors?.formErrors?.[0]) || "Erro ao iniciar atendimento";
            setError(msg);
            setSuccess(null);
        },
    });

    return (
        <div>
            <Button
                disabled={disabled || status === "executing"}
                variant="default"
                onClick={() => execute()}
            >
                <SmilePlus />
                {status === "executing" ? "Chamando..." : "Chamar próximo atendimento"}
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
        </div>
    );
};

export default CallNextTicketButton;