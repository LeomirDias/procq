import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getProfessionals } from "@/actions/get-user-professional";

import ProfessionalCard from "./_components/profesisonal-card";

const AdminsProfessionals = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/")
    }

    const [user, professionals] = await Promise.all([
        db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.user.id),
        }),
        getProfessionals({}),
    ]);

    if (user?.role === "professional") {
        redirect("/professional/dashboard");
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Profissionais</PageTitle>
                    <PageDescription>Gerencie os profissionais da sua empresa.</PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-5 gap-6">
                    {professionals?.data && professionals.data.length > 0 && professionals.data.map((professional: any) => (
                        <ProfessionalCard
                            key={professional.id}
                            professional={professional}
                        />
                    ))}
                    {professionals?.serverError && (
                        <span className="text-red-500">Erro ao buscar profissionais: {professionals.serverError}</span>
                    )}
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsProfessionals;