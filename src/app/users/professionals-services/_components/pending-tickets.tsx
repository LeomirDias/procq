import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ticketsTableColumns, TicketTableRow } from "./tickets-table-columns";
import CallNextTicketButton from "./call-next-ticket-button";

const PendingTickets = async () => {
    // Fetch tickets with client info
    const tickets = await db.query.ticketsTable.findMany({
        where: (ticket) => eq(ticket.status, "pending"),
        with: {
            client: true,
        },
    });

    if (!tickets.length) {
        return <div className="w-full h-full flex items-center justify-center">Nenhum atendimento pendente.</div>;
    }

    // Fetch all sectors and create a map for quick lookup
    const sectors = await db.query.sectorsTable.findMany();
    const sectorMap = Object.fromEntries(sectors.map(s => [s.id, s.name]));

    // Map tickets to TicketTableRow
    const tableData: TicketTableRow[] = tickets.map(ticket => ({
        id: ticket.id,
        status: ticket.status,
        clientName: ticket.client?.name || ticket.clientId,
        clientId: ticket.clientId,
        sectorName: sectorMap[ticket.sectorId] || ticket.sectorId,
        sectorId: ticket.sectorId,
    }));

    return (
        <div className="flex flex-col gap-4 w-full h-full max-h-[80vh]">
            <Card className="w-full h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Atendimentos Pendentes</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-0">
                    <div className="p-6">
                        <DataTable data={tableData} columns={ticketsTableColumns} />
                    </div>
                </CardContent>
            </Card>
            <CallNextTicketButton />
        </div>
    );
};

export default PendingTickets;