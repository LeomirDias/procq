import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddTicketCard = () => {
    return (
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
    );
}

export default AddTicketCard;