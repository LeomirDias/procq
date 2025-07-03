import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
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
        return <div>Nenhum atendimento pendente.</div>;
    }

    // Fetch all sectors and create a map for quick lookup
    const sectors = await db.query.sectorsTable.findMany();
    const sectorMap = Object.fromEntries(sectors.map(s => [s.id, s.name]));

    return (
        <div className="flex flex-col gap-4 mt-4">
            {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded p-4 flex flex-col gap-2 bg-white shadow">
                    <div className="flex items-center gap-2">
                        <Badge>{ticket.status}</Badge>
                        <span className="text-sm font-semibold">Prioridade:</span> {ticket.priority}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Setor:</span> {sectorMap[ticket.sectorId] || ticket.sectorId}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Cliente:</span> {ticket.client?.name || ticket.clientId}
                    </div>
                </div>
            ))}
            <CallNextTicketButton />
        </div>
    );
};

export default PendingTickets;