import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { professionalsTable, sectorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddProfessionalButton from "./_components/add-professional-button";
import ProfessionalCard from "./_components/profesisonal-card";

const AdminsProfessionals = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/admin-authentication");
    }
    if (!session.user.enterprise) {
        redirect("/enterprise-form");
    }
    const [professionals, sectors] = await Promise.all([
        db.query.professionalsTable.findMany({
            where: eq(professionalsTable.enterpriseId, session.user.enterprise.id),
        }),
        db.query.sectorsTable.findMany({
            where: eq(sectorsTable.enterpriseId, session.user.enterprise.id),
        })
    ]);

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Profissionais</PageTitle>
                    <PageDescription>Gerencie os profissionais da sua empresa.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddProfessionalButton sectors={sectors} />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-5 gap-6">
                    {professionals.map(professional => (
                        <ProfessionalCard
                            key={professional.id}
                            professional={professional}
                            sectors={sectors}
                        />
                    ))}
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsProfessionals;