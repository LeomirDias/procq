import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StartOperationButton from "./start-operation-button";
import { operationsTable, sectorsTable, servicePointsTable, usersTable } from "@/db/schema";
import ClientOperationTimerCard from "./operation-timer-card";
import FinishOperationButton from "./finish-operation-button";
import { Separator } from "@/components/ui/separator";
import CallTicketButton from "./call-ticket-button";


const MenuButtons = async ({ sectors, operations, user }: {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[],
    operations: (typeof operationsTable.$inferSelect & { servicePoint: typeof servicePointsTable.$inferSelect })[],
    user: typeof usersTable.$inferSelect
}) => {
    // Busca a operação ativa
    const activeOperation = operations.find(op => op.status === "operating");
    const sector = sectors.find(sector => sector.id === activeOperation?.servicePoint?.sectorId);

    return (
        <Card className="flex w-full">
            <CardContent className="flex flex-col gap-2 items-center justify-center w-full">
                {activeOperation ? (
                    <>
                        <FinishOperationButton operation={activeOperation} disabled={!activeOperation} />
                        <CallTicketButton sectors={sectors} disabled={!!activeOperation} />
                    </>
                ) : (
                    <StartOperationButton sectors={sectors} disabled={!!activeOperation} />
                )}

            </CardContent>
        </Card>
    );
};

export default MenuButtons;   