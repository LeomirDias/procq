import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import AddSectorButton from "./_components/add-sector-button";

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
                <></>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsSectors;