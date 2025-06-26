"use client"
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import StartOperationForm from "./start-operation-form";
import { sectorsTable, servicePointsTable } from "@/db/schema";

const StartOperationButton = ({ sectors }: { sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[] }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-white hover:bg-primary/90">
                    <Plus />
                    Iniciar operação
                </Button>
            </DialogTrigger>
            <StartOperationForm sectors={sectors} onSuccess={() => setIsOpen(false)} />
        </Dialog>
    );
}

export default StartOperationButton;