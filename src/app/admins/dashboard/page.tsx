import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { usersToEnterprisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";


const Home = async () => {

    // Busca e verifica se o usuário está autenticado
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const enterprise = await db.query.usersToEnterprisesTable.findMany({

        where: eq(usersToEnterprisesTable.userId, session?.user?.id || "")
    })

    if (enterprise.length === 0) {
        redirect("/admins/enterprise-form")
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>Gerencie a sua empresa.</PageDescription>
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

export default Home;