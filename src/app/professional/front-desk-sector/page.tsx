import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription } from "@/components/ui/page-container-professional";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { operationsTable, treatmentsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";



const FrontDeskSector
    = async () => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            redirect("/");
        }

        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.user.id),
        });

        if (!user?.id) {
            redirect("/");
        }

        if (user.role === "admin") {
            redirect("/administrator/dashboard");
        }

        const [
            sectors,
            operations,
            treatments,
            clients,
            tickets
        ] = await Promise.all([
            db.query.sectorsTable.findMany({
                with: {
                    servicePoints: true,
                }
            }),
            db.query.operationsTable.findMany({
                where: eq(operationsTable.userId, user.id),
                with: {
                    servicePoint: true,
                },
            }),
            Promise.resolve([]),
            db.query.clientsTable.findMany({
                with: {
                    treatments: true,
                }
            }),
            db.query.ticketsTable.findMany({
                with: {
                    client: true,
                    treatment: true,
                }
            })
        ]);

        let actualTreatments = [];
        if (operations.length > 0 && operations[0]?.id) {
            actualTreatments = await db.query.treatmentsTable.findMany({
                where: eq(treatmentsTable.operationId, operations[0].id),
                with: {
                    operation: true,
                }
            });
        }

        return (
            <div>
                <PageContainer>

                    <PageContent>
                        <div className="flex flex-row gap-4 w-full h-full">

                            <div className="flex flex-col gap-4 w-full h-full items-center justify-center">

                                <Card className="w-full">
                                    <CardHeader>
                                        <h1 className="text-lg font-bold">Buscar consumidor</h1>
                                        <p className="text-sm text-gray-500">Verificar se o consumidor está cadastrado no sistema</p>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="flex flex-col gap-2">
                                            <input type="text" placeholder="Informe o CPF para buscar..." className="w-full p-2 rounded-md border border-gray-300" />
                                            <Button type="submit">Buscar</Button>
                                        </form>
                                    </CardContent>
                                </Card>

                                <Card className="w-full">
                                    <CardHeader>
                                        <h1 className="text-lg font-bold">Cadastrar consumidor</h1>
                                        <p className="text-sm text-gray-500">Cadastre um novo consumidor no sistema.</p>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="flex flex-col gap-2">
                                            <input type="text" placeholder="Nome" className="w-full p-2 rounded-md border border-gray-300" />
                                            <input type="text" placeholder="CPF" className="w-full p-2 rounded-md border border-gray-300" />
                                            <input type="text" placeholder="Telefone" className="w-full p-2 rounded-md border border-gray-300" />
                                            <Button type="submit">Cadastrar</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex flex-col gap-4 w-1/2 h-full items-center justify-center">
                                <Card className="w-full h-1/2">
                                    <CardHeader>
                                        <h1 className="text-lg font-bold">Novo atendimento</h1>
                                        <p className="text-sm text-gray-500">Gere uma nova senha para atendimento</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            <Button>Gerar senha</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="w-full h-1/2">
                                    <CardHeader>
                                        <h1 className="text-lg font-bold">Próximos atendimentos</h1>
                                        <p className="text-sm text-gray-500">Acomapnhe as senhas em espera</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: P001 - Leomir - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C002 - Carlos - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: P002 - Henrique - Juridico</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C003 - Juliano - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C004 - Fulano 1 - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C005 - Fulano 2 - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C006 - Fulano 3 - Atendimento</p>
                                            </div>
                                            <div className="border-1 border-gray-200 rounded-md shadow-sm p-3">
                                                <p>Senha: C007 - Fulano 4 - Atendimento</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </PageContent>
                </PageContainer>
            </div >
        );
    }

export default FrontDeskSector
    ;