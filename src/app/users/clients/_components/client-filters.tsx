"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { clientsTableColumns } from "./table-columns";
import { Button } from "@/components/ui/button";

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
                    className="border rounded p-2 text-sm"
                />
                <input
                    type="text"
                    placeholder="Filtrar por CPF"
                    value={cpfFilter}
                    onChange={e => setCpfFilter(e.target.value)}
                    className="border rounded p-2 text-sm"
                />
                <Button
                    onClick={() => { setNameFilter(""); setCpfFilter(""); }}
                    variant="link"
                >
                    Resetar filtros
                </Button>
            </div>
            <DataTable data={filteredClients} columns={columns} />
        </>
    );
} 