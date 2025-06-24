"use client"
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { sectorsTable } from "@/db/schema";

import UpsertServicePointForm from "./upsert-service-point-form";

interface AddServicePointButtonProps {
    sectors: (typeof sectorsTable.$inferSelect)[];
}

const AddServicePointButton = ({ sectors }: AddServicePointButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Adicionar ponto de atendimento
                </Button>
            </DialogTrigger>
            <UpsertServicePointForm
                sectors={sectors}
                onSuccess={() => setIsOpen(false)}
            />
        </Dialog>
    );
}

export default AddServicePointButton;