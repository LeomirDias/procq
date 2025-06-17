import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

import AddSectorButton from "./_components/add-sector-button";

const AdminsSectors = () => {
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