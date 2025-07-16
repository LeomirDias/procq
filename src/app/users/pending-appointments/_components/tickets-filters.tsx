"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ticketsTableColumns, TicketTableRow } from "./table-columns";
import { Button } from "@/components/ui/button";

interface TicketsFiltersProps {
    tickets: TicketTableRow[];
    sectors: { id: string; name: string }[];
}

export default function TicketsFilters({ tickets, sectors }: TicketsFiltersProps) {
    const [nameFilter, setNameFilter] = useState("");
    const [cpfFilter, setCpfFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sectorFilter, setSectorFilter] = useState("");

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket =>
            ticket.clientName.toLowerCase().includes(nameFilter.toLowerCase()) &&
            ticket.clientId.includes(cpfFilter) &&
            (statusFilter ? ticket.status === statusFilter : true) &&
            (sectorFilter ? ticket.sectorId === sectorFilter : true)
        );
    }, [tickets, nameFilter, cpfFilter, statusFilter, sectorFilter]);

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
                    <option value="" className="bg-background">Status</option>
                    <option value="pending" className="bg-background">Pendente</option>
                    <option value="canceled" className="bg-background">Cancelado</option>
                    <option value="finished" className="bg-background">Atendido</option>
                </select>
                <select
                    value={sectorFilter}
                    onChange={e => setSectorFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                >
                    <option value="" className="bg-background">Setores</option>
                    {sectors.map(sector => (
                        <option key={sector.id} value={sector.id} className="bg-background">{sector.name}</option>
                    ))}
                </select>
                <Button
                    onClick={() => { setNameFilter(""); setCpfFilter(""); setStatusFilter(""); setSectorFilter(""); }}
                    variant="link"
                >
                    Resetar filtros
                </Button>
            </div>
            <DataTable data={filteredTickets} columns={ticketsTableColumns} />
        </>
    );
} 