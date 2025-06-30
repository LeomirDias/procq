"use client"
import { TicketCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

import { sectorsTable, servicePointsTable } from "@/db/schema";

const CallTicketButton = ({ sectors }: { sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[], disabled?: boolean }) => {

    return (
        <Button className="flex flex-col bg-green-500 h-auto text-white hover:bg-green-700">
            <TicketCheck className="w-4 h-4" />
            Chamar proxima senha
        </Button>
    );
}

export default CallTicketButton;