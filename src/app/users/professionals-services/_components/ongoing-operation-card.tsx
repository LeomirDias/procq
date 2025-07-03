import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { usersTable, servicePointsTable, sectorsTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import React from "react";
import FinishOperationButton from "./finish-operation-button";

interface OngoingOperationCardProps {
    operations: {
        id: string;
        status: string;
        userId: string;
        servicePointId: string;
    }[];
    sectors: (typeof sectorsTable.$inferSelect & {
        servicePoints: typeof servicePointsTable.$inferSelect[]
    })[]
}

const OngoingOperationCard = async ({ operations, sectors }: OngoingOperationCardProps) => {
    // Filtra a operação com status 'operating'
    const operatingOperation = operations.find(op => op.status === "operating");

    let userName = "";
    let servicePointName = "";

    if (operatingOperation) {
        const [user, servicePoint] = await Promise.all([
            db.query.usersTable.findFirst({ where: eq(usersTable.id, operatingOperation.userId) }),
            db.query.servicePointsTable.findFirst({ where: eq(servicePointsTable.id, operatingOperation.servicePointId) })
        ]);
        userName = user?.name || operatingOperation.userId;
        servicePointName = servicePoint?.name || operatingOperation.servicePointId;
    }

    return (
        <Card className="relative w-full" >
            {/* Bola verde no canto superior direito */}
            {operatingOperation && (
                <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-green-500 border-1 border-white shadow" title="Online"></span>
            )}
            <CardHeader className="space-y-4">
                <CardTitle>Operação em andamento</CardTitle>
                <Separator />
                <CardDescription>
                    {operatingOperation ? (
                        <>
                            Status: {operatingOperation.status === "operating" ? "Operando" : operatingOperation.status} <br />
                            Usuário: {userName} <br />
                            Ponto de Serviço: {servicePointName}
                        </>
                    ) : (
                        "Nenhuma operação em andamento."
                    )}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export default OngoingOperationCard;