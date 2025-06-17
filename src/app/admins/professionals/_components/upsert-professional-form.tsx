import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { upsertProfessional } from "@/actions/upsert-professional";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalsTable } from "@/db/schema";


const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome do profissional é obrigatório." }),
    position: z.string().trim().min(1, { message: "Posição é obrigatória." }),
    phoneNumber: z.string().trim().min(1, { message: "Telefone é obrigatório." }),
    acessLevel: z.string().trim().min(1, { message: "Nível de acesso é obrigatório." }),
});

interface UpsertProfessionalFormProps {
    professional?: typeof professionalsTable.$inferSelect;
    onSuccess?: () => void;
}

const UpsertProfessionalForm = ({ professional, onSuccess }: UpsertProfessionalFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: professional?.name || "",
            position: professional?.position || "",
            phoneNumber: professional?.phoneNumber || "",
            acessLevel: professional?.acessLevel || "",
        }
    });

    const upsertProfessionalAction = useAction(upsertProfessional, {
        onSuccess: () => {
            toast.success(professional ? "Profissional atualizado com sucesso!" : "Profissional adicionado com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            console.error("Erro ao salvar profissional:", error);
            toast.error(professional ? `Erro ao atualizar profissional.` : `Erro ao adicionar profissional.`);
        },
    });


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertProfessionalAction.execute({
            ...values,
            id: professional?.id,
        })
    };

    return (
        <DialogContent>
            <DialogTitle>{professional ? professional.name : "Adicionar profissional"}</DialogTitle>
            <DialogDescription>{professional ? "Edite as informações desse profissional." : "Adicione um novo profissional à sua empresa!"}</DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nome do profissional
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do profissonal" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Função
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite a função do profissional" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Telefone
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o número de telefone do profissional"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acessLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nível de acesso</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione o nível de acesso" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="admin">Administrador</SelectItem>
                                        <SelectItem value="professional">Padrão</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="submit" disabled={upsertProfessionalAction.isPending}>
                            {(upsertProfessionalAction.isPending)
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                                : professional ? "Editar profissional"
                                    : "Cadastrar profissional"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default UpsertProfessionalForm;