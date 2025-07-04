"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog } from "@/components/ui/dialog"
import CallNextTicketButton from "./call-next-ticket-button"

export type TicketTableRow = {
    id: string
    status: string
    clientName: string
    clientId: string
    sectorName: string
    sectorId: string
}

export const ticketsTableColumns: ColumnDef<TicketTableRow>[] = [
    {
        id: "clientName",
        accessorKey: "clientName",
        header: "Cliente",
    },
    {
        id: "sectorName",
        accessorKey: "sectorName",
        header: "Setor",
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            let label = status;
            let color = "";
            if (status === "pending") {
                label = "Aguardando";
                color = "bg-yellow-100 text-yellow-800 border-yellow-300";
            } else if (status === "canceled") {
                label = "Cancelado";
                color = "bg-red-100 text-red-800 border-red-300";
            } else if (status === "finished") {
                label = "Atendido";
                color = "bg-green-100 text-green-800 border-green-300";
            }
            return (
                <Badge className={color}>{label}</Badge>
            );
        },
    },
]