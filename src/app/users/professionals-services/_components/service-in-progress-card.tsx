
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FinishServiceButton from "./finish-service-button";

const ServiceInProgressCard = async () => {

    return (
        <div className="flex flex-col gap-4 w-full h-full max-h-[80vh]">
            <Card className="w-full h-full flex flex-col">
                <CardContent className="flex-1 overflow-auto p-0">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="font-semibold text-primary">Dados do atendimento em andamento</h1>
                        <div className="flex flex-row gap-2">
                            <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">Consumidor:</span> João da Silva</p>
                            <div className="h-4 border-l-1 border-gray-300" />
                            <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">Data:</span> 04/07/2025</p>
                            <div className="h-4 border-l-1 border-gray-300" />
                            <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">Horário de início:</span> 10:00</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-center gap-4 w-full">
                    <FinishServiceButton />
                </CardFooter>
            </Card>
        </div>
    );
};

export default ServiceInProgressCard;