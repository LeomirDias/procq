import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { sectorsTable, servicePointsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddServicePointButton from "./_components/add-service-point-button";
import ServicePointCard from "./_components/service-point-cards";

const AdminsServicePoints = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/admin-authentication");
    }
    if (!session.user.enterprise) {
        redirect("/enterprise-form");
    }

    const [servicePoints, sectors] = await Promise.all([
        db.query.servicePointsTable.findMany({
            where: eq(servicePointsTable.enterpriseId, session.user.enterprise.id),
        }),
        db.query.sectorsTable.findMany({
            where: eq(sectorsTable.enterpriseId, session.user.enterprise.id),
        })
    ]);

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Pontos de atendimento</PageTitle>
                    <PageDescription>Gerencie seus pontos de atendimento.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddServicePointButton sectors={sectors} />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-5 gap-6">
                    {servicePoints.map(servicePoint => (
                        <ServicePointCard
                            key={servicePoint.id}
                            servicePoint={servicePoint}
                            sectors={sectors}
                        />
                    ))}
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsServicePoints;