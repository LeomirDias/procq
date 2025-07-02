import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription } from "@/components/ui/page-container-professional";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { operationsTable, treatmentsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddTicketCard from "./_components/add-ticket-card";
import NextAppoitmentCard from "./_components/next appointment card";
import CreateClientForm from "./_components/create-client-form";
import GetClientForm from "./_components/get-client-form";



const FrontDeskSector
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
            <div>
                <PageContainer>

                    <PageContent>
                        <div className="flex flex-row gap-4 w-full h-full">

                            <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
                                <GetClientForm />
                                <CreateClientForm />
                            </div>

                            <div className="flex flex-col gap-4 w-1/2 h-full items-center justify-center">
                                <AddTicketCard />
                                <NextAppoitmentCard />
                            </div>
                        </div>
                    </PageContent>
                </PageContainer>
            </div >
        );
    }

export default FrontDeskSector
    ;