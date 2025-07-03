"use client"

import { ColumnDef } from "@tanstack/react-table"

import { clientsTable } from "@/db/schema"

import TableClientActions from "./table-actions"

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
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Telefone",
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