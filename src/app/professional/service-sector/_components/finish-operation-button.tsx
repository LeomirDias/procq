"use client"
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { finishOperation } from "@/actions/finish-operation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { operationsTable, servicePointsTable } from "@/db/schema";

const FinishOperationButton = ({ operation, disabled }: { operation?: (typeof operationsTable.$inferSelect) & { servicePoint: typeof servicePointsTable.$inferSelect }, disabled?: boolean }) => {

    const [isOpen, setIsOpen] = useState(false);
    const finishOperationAction = useAction(finishOperation, {
        onSuccess: () => {
            toast.success("Operação finalizada com sucesso!");
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Erro ao finalizar operação.");
            console.error(error);
        },
    });
    const handleFinish = () => {
        if (operation) {
            finishOperationAction.execute({ operationId: operation.id });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex flex-col h-auto bg-red-500 text-white hover:bg-red-700" disabled={disabled || finishOperationAction.isPending} onClick={handleFinish}>
                    <Check className={disabled ? "hidden" : ""} />
                    {finishOperationAction.isPending ? "Finalizando..." : disabled ? "Finalizando" : "Finalizar operação"}
                </Button>
            </DialogTrigger>
        </Dialog>
    );
}

export default FinishOperationButton;