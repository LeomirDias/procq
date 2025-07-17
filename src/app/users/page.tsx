import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader, PageHeaderContent, PageTitle, PageDescription, PageContent } from "@/components/ui/page-container";
import { Headset, Smile, UserRoundCog } from "lucide-react";
import Image from "next/image";

const Home = () => {
    return (
        <PageContainer>
            <PageContent>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <Image src="/Logo.svg" alt="Procon Logo" width={200} height={80} />
                    <h1 className="text-2xl font-bold text-secondary-foreground">Seja bem vindo ao sistema de atendimento do Procon Itumbiara</h1>
                    <p className="text-md text-secondary-foreground">Escolha uma das opções abaixo para continuar</p>
                </div>
                <div className="grid grid-cols-3 w-full h-full gap-4">
                    <a href="/users/dashboard">
                        <Button className="w-full h-[100px] flex items-center justify-center gap-2 text-lg" variant="outline">
                            <UserRoundCog />
                            Sou administrador
                        </Button>
                    </a>
                    <a href="/users/clients">
                        <Button className="w-full h-[100px] flex items-center justify-center gap-2 text-lg" variant="outline">
                            <Smile />
                            Sou recepcionista
                        </Button>
                    </a>
                    <a href="/users/professionals-services">
                        <Button className="w-full h-[100px] flex items-center justify-center gap-2 text-lg" variant="outline">
                            <Headset />
                            Sou sou atendente
                        </Button>
                    </a>
                </div>
            </PageContent>
        </PageContainer>
    );
}

export default Home;