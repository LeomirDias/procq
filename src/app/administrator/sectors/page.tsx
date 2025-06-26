import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";  
import { auth } from "@/lib/auth";

import AddSectorButton from "./_components/add-sector-button";
import SectorsGrid from "./_components/sectors-cards";

const AdminsSectors = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/admin-authentication");
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
                    <PageTitle>Setores</PageTitle>
                    <PageDescription>Gerencie seus setores.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddSectorButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <SectorsGrid sectors={sectors} />
            </PageContent>
        </PageContainer>
    );
}

export default AdminsSectors;