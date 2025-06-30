import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StartOperationButton from "./start-operation-button";
import { operationsTable, sectorsTable, servicePointsTable, usersTable } from "@/db/schema";
import ClientOperationTimerCard from "./operation-timer-card";
import FinishOperationButton from "./finish-operation-button";
import { Separator } from "@/components/ui/separator";


const OperationCard = async ({ sectors, operations, user }: {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[],
    operations: (typeof operationsTable.$inferSelect & { servicePoint: typeof servicePointsTable.$inferSelect })[],
    user: typeof usersTable.$inferSelect
}) => {
    // Busca a operação ativa
    const activeOperation = operations.find(op => op.status === "operating");
    const sector = sectors.find(sector => sector.id === activeOperation?.servicePoint?.sectorId);

    return (
        <Card className="w-full h-full flex flex-col grow justify-between" >
            <CardContent className="flex flex-row gap-2 items-center justify-center h-[600px]">
                <p className="text-sm text-gray-500">Atendimentos Realizados</p>
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-row gap-2 items-end justify-center">
                {activeOperation ? (
                    <>
                        <FinishOperationButton operation={activeOperation} disabled={!activeOperation} />
                    </>
                ) : (
                    <StartOperationButton sectors={sectors} disabled={!!activeOperation} />
                )}
            </CardFooter>

        </Card>
    );
};

export default OperationCard;   