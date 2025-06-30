"use client"
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import StartOperationForm from "./start-operation-form";
import { sectorsTable, servicePointsTable } from "@/db/schema";

const StartOperationButton = ({ sectors, disabled }: { sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[], disabled?: boolean }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex flex-col h-auto bg-green-500 text-white hover:bg-green-700" disabled={disabled}>
                    <Plus className={disabled ? "hidden" : ""} />
                    {disabled ? "Operando" : "Iniciar operação"}
                </Button>
            </DialogTrigger>
            <StartOperationForm sectors={sectors} onSuccess={() => setIsOpen(false)} />
        </Dialog>
    );
}

export default StartOperationButton;