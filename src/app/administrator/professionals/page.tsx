import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import ProfessionalCard from "./_components/profesisonal-card";

const AdminsProfessionals = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/")
    }

    const [user] = await Promise.all([
        db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.user.id),
        }),
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
                    {user?.role === "professional" && (
                        <ProfessionalCard
                            key={user.id}
                            professional={user}
                        />
                    )}
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsProfessionals;