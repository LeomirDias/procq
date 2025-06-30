"use client"
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { sectorsTable, servicePointsTable } from "@/db/schema";

const CallTicketButton = ({ sectors }: { sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[], disabled?: boolean }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-white hover:bg-primary/90">
                    Chamar senha
                </Button>
            </DialogTrigger>
        </Dialog>
    );
}

export default CallTicketButton;