"use client"
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { sectorsTable } from "@/db/schema";

import UpsertProfessionalForm from "./upsert-professional-form";

interface AddProfessionalButtonProps {
    sectors: (typeof sectorsTable.$inferSelect)[];
}

const AddProfessionalButton = ({ sectors }: AddProfessionalButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Adicionar profissonal
                </Button>
            </DialogTrigger>
            <UpsertProfessionalForm
                sectors={sectors}
                onSuccess={() => setIsOpen(false)}
            />
        </Dialog>
    );
}

export default AddProfessionalButton;