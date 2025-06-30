import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { operationsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PageContainer, PageContent, PageHeader } from "@/components/ui/page-container-professional";
import OperationCard from "./_components/operation-card";
import AppMenuBar from "../_components/app-menu-bar";


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

    return (
        <PageContainer>
            <PageHeader>
                {user && (
                    <AppMenuBar sectors={sectors} operations={operations} user={user} />
                )}
            </PageHeader>
            <PageContent>
                <div className="flex flex-col items-center justify-center w-1/3 h-[calc(100vh-100px)]">
                    {user && (
                        <OperationCard sectors={sectors} operations={operations} user={user} />
                    )}
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default ProfessionalDashboardPage;