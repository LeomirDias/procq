"use client"

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { callTheCustomerAgain } from "@/actions/call-the-customer-again";
import { toast } from "sonner";
import { useState } from "react";

const CallCustomerAgainButton = () => {
    const [error, setError] = useState<string | null>(null);
    const { execute, status } = useAction(callTheCustomerAgain, {
        onSuccess: (result) => {
            if (result.data?.error) {
                toast.error(result.data.error);
                setError(result.data.error);
                return;
            }
            toast.success("Cliente chamado novamente com sucesso!");
            setError(null);
        },
        onError: (error) => {
            const msg = error.error?.serverError || "Erro ao chamar o cliente novamente";
            toast.error(msg);
            setError(msg);
        },
    });

    return (
        <Button
            variant="outline"
            disabled={status === "executing"}
            onClick={() => execute()}
        >
            <Volume2 className="w-4 h-4 mr-2" />
            {status === "executing" ? "Chamando..." : "Chamar novamente"}
        </Button>
    );
};

export default CallCustomerAgainButton; 