import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { db } from "@/db";
import { clientsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import AddClientButton from "./_components/add-client-button";
import { clientsTableColumns } from "./_components/table-columns";
import { DataTable } from "@/components/ui/data-table";
import ClientFilters from "./_components/client-filters";

const ProfessionalServices = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const clients = await db.query.clientsTable.findMany();

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Produtos</PageTitle>
                    <PageDescription>Visualize e gerencie os produtos em seu estoque.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddClientButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <ClientFilters clients={clients} />
            </PageContent>
        </PageContainer>
    );
}

export default ProfessionalServices;