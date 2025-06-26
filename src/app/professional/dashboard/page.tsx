import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container-professional";
import StartOperationButton from "./_components/start-operation-button";

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


    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>Relatórios e informações sobre a operação.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <StartOperationButton sectors={sectors} />
                </PageActions>
            </PageHeader>
            <PageContent>
                <></>
            </PageContent>
        </PageContainer>
    );
};

export default ProfessionalDashboardPage;