import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { sectorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddSectorButton from "./_components/add-sector-button";
import SectorCard from "./_components/sectors-cards";

const AdminsSectors = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/admin-authentication");
    }
    if (!session.user.enterprise) {
        redirect("/enterprise-form");
    }
    const sectors = await db.query.sectorsTable.findMany({
        where: eq(sectorsTable.enterpriseId, session.user.enterprise.id),
    })
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Setores</PageTitle>
                    <PageDescription>Gerencie os setores da sua empresa.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddSectorButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-5 gap-6">
                    {sectors.map(sector => <SectorCard key={sector.id} sector={sector} />)}
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsSectors;