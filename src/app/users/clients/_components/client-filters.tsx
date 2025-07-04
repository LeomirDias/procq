"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { clientsTableColumns } from "./table-columns";

export default function ClientFilters({ clients, sectors }: { clients: any[], sectors: any[] }) {
    const [nameFilter, setNameFilter] = useState("");
    const [cpfFilter, setCpfFilter] = useState("");

    const filteredClients = useMemo(() => {
        return clients.filter(client =>
            client.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            client.register.includes(cpfFilter)
        );
    }, [clients, nameFilter, cpfFilter]);

    const columns = useMemo(() => clientsTableColumns(sectors), [sectors]);

    return (
        <>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                    className="border rounded px-2 py-1"
                />
                <input
                    type="text"
                    placeholder="Filtrar por CPF"
                    value={cpfFilter}
                    onChange={e => setCpfFilter(e.target.value)}
                    className="border rounded px-2 py-1"
                />
                <button
                    onClick={() => { setNameFilter(""); setCpfFilter(""); }}
                    className="border rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                >
                    Resetar filtros
                </button>
            </div>
            <DataTable data={filteredClients} columns={columns} />
        </>
    );
} 