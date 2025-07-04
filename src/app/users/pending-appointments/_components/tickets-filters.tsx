"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ticketsTableColumns, TicketTableRow } from "./table-columns";

interface TicketsFiltersProps {
    tickets: TicketTableRow[];
    sectors: { id: string; name: string }[];
}

export default function TicketsFilters({ tickets, sectors }: TicketsFiltersProps) {
    const [nameFilter, setNameFilter] = useState("");
    const [cpfFilter, setCpfFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket =>
            ticket.clientName.toLowerCase().includes(nameFilter.toLowerCase()) &&
            ticket.clientId.includes(cpfFilter) &&
            (statusFilter ? ticket.status === statusFilter : true)
        );
    }, [tickets, nameFilter, cpfFilter, statusFilter]);

    return (
        <>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                />
                <input
                    type="text"
                    placeholder="Buscar por CPF..."
                    value={cpfFilter}
                    onChange={e => setCpfFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                >
                    <option value="">Todos status</option>
                    <option value="pending">Pendente</option>
                    <option value="canceled">Cancelado</option>
                    <option value="finished">Finalizado</option>
                </select>
                <button
                    onClick={() => { setNameFilter(""); setCpfFilter(""); setStatusFilter(""); }}
                    className="border rounded p-2 bg-gray-200 hover:bg-gray-300"
                >
                    Resetar filtros
                </button>
            </div>
            <DataTable data={filteredTickets} columns={ticketsTableColumns} />
        </>
    );
} 