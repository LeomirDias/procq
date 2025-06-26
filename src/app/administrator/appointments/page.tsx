
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AccessDenied } from "@/components/ui/access-denied";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";


const SupportPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, session.user.id),
    });

    if (user?.role !== "admin") {
        return <AccessDenied />
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Atendimentos</PageTitle>
                    <PageDescription>Acompanhe e gerencie os atendimentos.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <></>
                </PageActions>
            </PageHeader>
            <PageContent>
                <></>
            </PageContent>
        </PageContainer>
    );
}

export default SupportPage;