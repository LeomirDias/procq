import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { operationsTable, treatmentsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PageContainer, PageContent, PageHeader } from "@/components/ui/page-container-professional";
import TreatmentsCard from "./_components/treatments-card";
import OperationBar from "./_components/operation-bar";
import TicketsCard from "./_components/tickets-card";


const ServiceSector
    = async () => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            redirect("/");
        }

        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.user.id),
        });

        if (!user?.id) {
            redirect("/");
        }

        if (user.role === "admin") {
            redirect("/administrator/dashboard");
        }

        const [
            sectors,
            operations,
            treatments,
            clients,
            tickets
        ] = await Promise.all([
            db.query.sectorsTable.findMany({
                with: {
                    servicePoints: true,
                }
            }),
            db.query.operationsTable.findMany({
                where: eq(operationsTable.userId, user.id),
                with: {
                    servicePoint: true,
                },
            }),
            Promise.resolve([]),
            db.query.clientsTable.findMany({
                with: {
                    treatments: true,
                }
            }),
            db.query.ticketsTable.findMany({
                with: {
                    client: true,
                    treatment: true,
                }
            })
        ]);

        let actualTreatments = [];
        if (operations.length > 0 && operations[0]?.id) {
            actualTreatments = await db.query.treatmentsTable.findMany({
                where: eq(treatmentsTable.operationId, operations[0].id),
                with: {
                    operation: true,
                }
            });
        }

        return (
            <PageContainer>
                <PageContent>
                    <div className="flex flex-row w-full h-[calc(100vh-100px)] gap-4">
                        {/* Coluna esquerda: MenuButtons acima do TicketsCard */}
                        <div className="flex flex-col flex-1 h-full gap-4">
                            {user && (
                                <>
                                    <div className="w-full">
                                        <OperationBar sectors={sectors} operations={operations} user={user} />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <TicketsCard sectors={sectors} operations={operations} user={user} treatments={treatments} />
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Coluna direita: TreatmentsCard ocupando toda a altura */}
                        <div className="flex flex-col h-full w-[340px] min-w-[300px] max-w-[400px]">
                            {user && (
                                <TreatmentsCard sectors={sectors} operations={operations} user={user} treatments={treatments} />
                            )}
                        </div>
                    </div>
                </PageContent>
            </PageContainer>
        );
    };

export default ServiceSector
    ;