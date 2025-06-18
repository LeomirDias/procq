import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { upsertServicePoint } from "@/actions/upsert-service-point";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sectorsTable, servicePointsTable } from "@/db/schema";

const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome do ponto de atendimento é obrigatório." }),
    sectorId: z.string().uuid({ message: "Setor é obrigatório." }),
});

type FormData = z.infer<typeof formSchema>;

interface UpsertServicePointFormProps {
    servicePoint?: typeof servicePointsTable.$inferSelect;
    sectors: (typeof sectorsTable.$inferSelect)[];
    onSuccess?: () => void;
}

const UpsertServicePointForm = ({ servicePoint, sectors, onSuccess }: UpsertServicePointFormProps) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: servicePoint?.name ?? "",
            sectorId: servicePoint?.sectorId ?? "",
        }
    });

    const { execute, isPending } = useAction(upsertServicePoint, {
        onSuccess: () => {
            toast.success(servicePoint ? "Ponto de atendimento atualizado com sucesso!" : "Ponto de atendimento adicionado com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            console.error("Erro ao salvar ponto de atendimento:", error);
            toast.error(servicePoint ? "Erro ao atualizar ponto de atendimento." : "Erro ao adicionar ponto de atendimento.");
        },
    });

    const onSubmit = (values: FormData) => {
        execute({
            ...values,
            id: servicePoint?.id,
        });
    };

    return (
        <DialogContent>
            <DialogTitle>{servicePoint ? servicePoint.name : "Adicionar ponto de atendimento"}</DialogTitle>
            <DialogDescription>
                {servicePoint
                    ? "Edite as informações desse ponto de atendimento."
                    : "Adicione um novo ponto de atendimento à sua empresa!"}
            </DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do ponto de atendimento</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o nome do ponto de atendimento"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sectorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Setor</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o setor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sectors.map((sector) => (
                                            <SelectItem
                                                key={sector.id}
                                                value={sector.id}
                                            >
                                                {sector.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : servicePoint ? (
                                "Editar ponto de atendimento"
                            ) : (
                                "Cadastrar ponto de atendimento"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default UpsertServicePointForm;