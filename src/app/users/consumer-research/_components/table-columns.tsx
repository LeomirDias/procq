"use client"

import { ColumnDef } from "@tanstack/react-table"

import { clientsTable } from "@/db/schema"

import TableClientActions from "./table-actions"
import { formatCPF, formatPhoneNumber } from "@/lib/utils"

type Client = typeof clientsTable.$inferSelect;

export const clientsTableColumns: ColumnDef<Client>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: "Nome",
    },
    {
        id: "register",
        accessorKey: "register",
        header: "CPF",
        cell: ({ row }) => formatCPF(row.original.register),
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Telefone",
        cell: ({ row }) => formatPhoneNumber(row.original.phoneNumber),
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const client = row.original;
            return (
                <TableClientActions client={client} />
            )
        }
    },
]