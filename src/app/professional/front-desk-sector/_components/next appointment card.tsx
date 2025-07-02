import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NextAppoitmentCard = () => {
    return (
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
    );
}

export default NextAppoitmentCard;