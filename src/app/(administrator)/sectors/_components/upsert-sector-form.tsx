import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { upsertSector } from "@/actions/upsert-sector";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sectorsTable } from "@/db/schema";

const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome do setor é obrigatório." }),
});

interface UpsertSectorFormProps {
    sector?: typeof sectorsTable.$inferSelect;
    onSuccess?: () => void;
}

const UpsertSectorForm = ({ sector, onSuccess }: UpsertSectorFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: sector?.name || "",
        }
    })

    const upsertSectorAction = useAction(upsertSector, {
        onSuccess: () => {
            toast.success(sector ? "Setor atualizado com sucesso!" : "Setor adicionado com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            console.error("Erro ao salvar setor:", error);
            toast.error(sector ? `Erro ao atualizar setor.` : `Erro ao adicionar setor.`);
        },
    });


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertSectorAction.execute({
            ...values,
            id: sector?.id,
        })
    };

    return (
        <DialogContent>
            <DialogTitle>{sector ? sector.name : "Adicionar setor"}</DialogTitle>
            <DialogDescription>{sector ? "Edite as informações desse setor." : "Adicione um novo setor à sua empresa!"}</DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nome do setor
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do setor" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={upsertSectorAction.isPending}>
                            {(upsertSectorAction.isPending)
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                                : sector ? "Editar setor"
                                    : "Cadastrar setor"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default UpsertSectorForm;