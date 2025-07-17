import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import AddClientButton from "./_components/add-client-button";
import ClientFilters from "./_components/client-filters";

const ProfessionalServices = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const clients = await db.query.clientsTable.findMany();
    const sectors = await db.query.sectorsTable.findMany();

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Consumidores</PageTitle>
                    <PageDescription>Visualize e gerencie os consumidores.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddClientButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <ClientFilters clients={clients} sectors={sectors} />
            </PageContent>
        </PageContainer>
    );
}

export default ProfessionalServices;