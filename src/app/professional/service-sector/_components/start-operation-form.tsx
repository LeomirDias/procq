import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { startOperation } from "@/actions/start-operation";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { sectorsTable, servicePointsTable } from "@/db/schema";
import { useState } from "react";

const formSchema = z.object({
    servicePointId: z.string().trim().min(1, { message: "Ponto de serviço é obrigatório." }),
});

interface StartOperationFormProps {
    sectors: (typeof sectorsTable.$inferSelect & { servicePoints: typeof servicePointsTable.$inferSelect[] })[];
    onSuccess?: () => void;
}

const StartOperationForm = ({ sectors, onSuccess }: StartOperationFormProps) => {
    const [selectedServicePoint, setSelectedServicePoint] = useState<typeof servicePointsTable.$inferSelect | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            servicePointId: "",
        }
    })

    const startOperationAction = useAction(startOperation, {
        onSuccess: () => {
            toast.success("Operação iniciada com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            console.error("Erro ao iniciar operação:", error);
            toast.error("Erro ao iniciar operação.");
        },
    });


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startOperationAction.execute(values)
    };

    return (
        <DialogContent>
            <DialogTitle>Iniciar operação</DialogTitle>
            <DialogDescription>Selecione o ponto de serviço para iniciar a operação.</DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="servicePointId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Ponto de serviço
                                </FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value) => {
                                        // Encontrar o objeto servicePoint correspondente ao id selecionado
                                        const selected = sectors.flatMap(sector => sector.servicePoints).find(sp => sp.id === value) || null;
                                        setSelectedServicePoint(selected);
                                        field.onChange(value); // Atualiza o valor do formulário normalmente
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o ponto de serviço" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sectors.map((sector) => sector.servicePoints.map((servicePoint) => (
                                                <SelectItem key={servicePoint.id} value={servicePoint.id}>
                                                    {servicePoint.name} - {sector.name}
                                                </SelectItem>
                                            )))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={startOperationAction.isPending}>
                            {(startOperationAction.isPending)
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                                : "Iniciar operação"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default StartOperationForm;