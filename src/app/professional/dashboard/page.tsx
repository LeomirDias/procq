import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { operationsTable, treatmentsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PageContainer, PageContent, PageHeader } from "@/components/ui/page-container-professional";
import TreatmentsCard from "./_components/treatments-card";
import AppMenuBar from "../_components/app-menu-bar";
import MenuButtons from "./_components/menu-buttons";
import TicketsCard from "./_components/tickets-card";


const ProfessionalDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, session.user.id),
    });


    if (user?.role === "admin") {
        redirect("/administrator/dashboard");
    }

    const sectors = await db.query.sectorsTable.findMany({
        with: {
            servicePoints: true,
        }
    });

    const operations = await db.query.operationsTable.findMany({
        where: eq(operationsTable.userId, user?.id ?? ""),
        with: {
            servicePoint: true,
        },
    });

    const treatments = await db.query.treatmentsTable.findMany({
        where: eq(treatmentsTable.operationId, operations[0]?.id ?? ""),
        with: {
            operation: true,
        }
    });

    return (
        <PageContainer>
            <PageHeader>
                {user && (
                    <AppMenuBar sectors={sectors} operations={operations} user={user} />
                )}
            </PageHeader>
            <PageContent>
                <div className="flex flex-row w-full h-[calc(100vh-100px)] gap-4">
                    {/* Coluna esquerda: MenuButtons acima do TicketsCard */}
                    <div className="flex flex-col flex-1 h-full gap-4">
                        {user && (
                            <>
                                <div className="w-full">
                                    <MenuButtons sectors={sectors} operations={operations} user={user} />
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

export default ProfessionalDashboardPage;