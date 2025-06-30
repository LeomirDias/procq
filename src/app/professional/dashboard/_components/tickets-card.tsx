import { Card, CardContent } from "@/components/ui/card";
import { operationsTable, sectorsTable, servicePointsTable, treatmentsTable, usersTable } from "@/db/schema";

const TicketsCard = async ({ sectors, operations, user, treatments }: {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[],
    operations: (typeof operationsTable.$inferSelect & { servicePoint: typeof servicePointsTable.$inferSelect })[],
    user: typeof usersTable.$inferSelect,
    treatments: (typeof treatmentsTable.$inferSelect & { operation: typeof operationsTable.$inferSelect })[],
}) => {
    // Busca a operação ativa
    const activeOperation = operations.find(op => op.status === "operating");
    const sector = sectors.find(sector => sector.id === activeOperation?.servicePoint?.sectorId);

    return (
        <Card className="flex flex-1 h-full w-full">
            <CardContent className="flex flex-col h-full w-full gap-2 items-start justify-center">
                <p className="text-sm text-gray-500">Fila de senhas</p>
            </CardContent>
        </Card>
    );
};

export default TicketsCard;   