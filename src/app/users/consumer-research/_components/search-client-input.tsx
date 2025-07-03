"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
// Certifique-se de instalar: npm install react-number-format
// import type { SafeActionError } from "next-safe-action";

import { getClientByRegister, getAllClients } from "@/actions/get-client-by-register";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Tipo Client correspondente à tabela clientsTable
interface Client {
    id: string;
    name: string;
    register: string;
    phoneNumber: string;
    createdAT: string;
    updatedAt: string;
}

const schema = z.object({
    register: z.string().min(1, "Informe o CPF do cliente"),
});

type FormValues = z.infer<typeof schema>;

export function SearchClientInput() {
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [nameFilter, setNameFilter] = useState("");
    const [registerFilter, setRegisterFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllClients()
            .then((data: any) => {
                const clientsArr = Array.isArray(data) ? data : data?.data ?? [];
                setClients(clientsArr);
                setFilteredClients(clientsArr);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao buscar clientes");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = clients;
        if (nameFilter) {
            filtered = filtered.filter((c) => c.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        if (registerFilter) {
            filtered = filtered.filter((c) => c.register.includes(registerFilter));
        }
        setFilteredClients(filtered);
    }, [nameFilter, registerFilter, clients]);

    return (
        <div className="w-full mx-auto flex flex-col gap-6">
            <div className="flex gap-2 items-end w-full">
                <Input
                    placeholder="Filtrar por nome"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="flex-1"
                />
                <Input
                    placeholder="Filtrar por CPF"
                    value={registerFilter}
                    onChange={(e) => setRegisterFilter(e.target.value)}
                    className="flex-1"
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setNameFilter("");
                        setRegisterFilter("");
                    }}
                >
                    Resetar filtros
                </Button>
            </div>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-gray-200 rounded-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Nome</th>
                                <th className="px-4 py-2 text-left">CPF</th>
                                <th className="px-4 py-2 text-left">Telefone</th>
                                <th className="px-4 py-2 text-left">Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">Nenhum cliente encontrado.</td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-2">{client.name}</td>
                                        <td className="px-4 py-2">{client.register}</td>
                                        <td className="px-4 py-2">{client.phoneNumber}</td>
                                        <td className="px-4 py-2">{client.createdAT ? new Date(client.createdAT).toLocaleString() : "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
