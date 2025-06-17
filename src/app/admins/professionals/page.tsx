import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

import AddProfessionalButton from "./_components/add-professional-button";

const AdminsProfessionals = () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Profissionais</PageTitle>
                    <PageDescription>Gerencie os profissionais da sua empresa.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddProfessionalButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <></>
            </PageContent>
        </PageContainer>
    );
}

export default AdminsProfessionals;