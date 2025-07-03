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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    servicePointId: z.string().min(1, { message: "Selecione o ponto de atendimento." }),
});

interface StartOperationFormProps {
    onSuccess?: () => void;
    sectors: {
        id: string;
        name: string;
        servicePoints: { id: string; name: string }[];
    }[];
}

const StartOperationForm = ({ onSuccess, sectors }: StartOperationFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            servicePointId: "",
        }
    });

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
        startOperationAction.execute(values);
    };

    return (
        <DialogContent>
            <DialogTitle>Iniciar operação</DialogTitle>
            <DialogDescription>Selecione o ponto de atendimento.</DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="servicePointId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ponto de atendimento</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={startOperationAction.isPending}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o ponto de atendimento" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sectors.map(sector => (
                                                <SelectGroup key={sector.id}>
                                                    <SelectLabel>{sector.name}</SelectLabel>
                                                    {sector.servicePoints.map(sp => (
                                                        <SelectItem key={sp.id} value={sp.id}>{sp.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={startOperationAction.isPending}>
                            {startOperationAction.isPending
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciando...</>
                                : "Iniciar operação"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default StartOperationForm;