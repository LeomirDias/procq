import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StartOperationButton from "./start-operation-button";
import { operationsTable, sectorsTable, servicePointsTable, usersTable } from "@/db/schema";
import ClientOperationTimerCard from "./operation-timer-card";
import FinishOperationButton from "./finish-operation-button";
import { Separator } from "@/components/ui/separator";
import CallTicketButton from "./call-ticket-button";


const OperationBar = async ({ sectors, operations, user }: {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[],
    operations: (typeof operationsTable.$inferSelect & { servicePoint: typeof servicePointsTable.$inferSelect })[],
    user: typeof usersTable.$inferSelect
}) => {
    // Busca a operação ativa
    const activeOperation = operations.find(op => op.status === "operating");
    const sector = sectors.find(sector => sector.id === activeOperation?.servicePoint?.sectorId);

    return (
        <Card className="flex w-full">
            <CardContent className="flex flex-row gap-2 items-center justify-center w-full">
                <div className="flex flex-row gap-2 items-center justify-center w-1/2 h-full">
                    {activeOperation ? (
                        <>
                            <FinishOperationButton operation={activeOperation} disabled={!activeOperation} />
                            <CallTicketButton sectors={sectors} disabled={!!activeOperation} />
                        </>
                    ) : (
                        <StartOperationButton sectors={sectors} disabled={!!activeOperation} />
                    )}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center w-1/2">
                    <div className="flex flex-col gap-2 items-center justify-center w-full">
                        <h1 className="text-lg font-semibold text-green-600">{activeOperation?.servicePoint?.name} - {sector?.name}</h1>
                        {activeOperation ? (
                            <div className="flex flex-row gap-2 items-center">
                                <p className="flex items-center gap-1">
                                    <span className="text-sm text-green-600">
                                        {activeOperation?.status === "operating" ? "Em operação" : activeOperation?.status}
                                    </span>
                                </p>
                                <div>
                                    {activeOperation.createdAT && (
                                        <ClientOperationTimerCard createdAt={activeOperation.createdAT} status={activeOperation.status} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma operação ativa no momento.</p>
                        )}
                    </div>
                </div>


            </CardContent>
        </Card>
    );
};

export default OperationBar;   