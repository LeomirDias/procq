import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GetClientForm = () => {
    return (
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
    );
}

export default GetClientForm;