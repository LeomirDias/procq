import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientsTable } from "@/db/schema";
import { insertClient, updateUser } from "@/actions/upsert-client";

const formSchema = z.object({
    name: z.string().trim().min(3, { message: "Nome do cliente deve ter pelo menos 3 caracteres." }),
    register: z.string().trim().min(11, { message: "CPF do cliente deve ter pelo menos 11 caracteres." }),
    phoneNumber: z.string().trim().min(11, { message: "Telefone do cliente deve ter pelo menos 11 caracteres." }),
})

interface upsertClientForm {
    client?: typeof clientsTable.$inferSelect;
    onSuccess?: () => void;
}

const UpsertClientForm = ({ client, onSuccess }: upsertClientForm) => {
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: client?.name || "",
            register: client?.register || "",
            phoneNumber: client?.phoneNumber || "",
        }
    })

    const { execute: executeInsertClient, status: insertStatus } = useAction(insertClient, {
        onSuccess: () => {
            toast.success("Cliente adicionado com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            toast.error("Erro ao adicionar cliente.");
            console.log(error);
        },
    });

    const { execute: executeUpdateUser, status: updateStatus } = useAction(updateUser, {
        onSuccess: () => {
            toast.success("Cliente atualizado com sucesso!");
            onSuccess?.();
            form.reset();
        },
        onError: (error) => {
            toast.error("Erro ao atualizar cliente.");
            console.log(error);
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (client) {
            executeUpdateUser({
                ...values,
                id: client.id,
            });
        } else {
            executeInsertClient(values);
        }
    };

    const isPending = client ? updateStatus === "executing" : insertStatus === "executing";

    return (
        <DialogContent>
            <DialogTitle>{client ? client.name : "Adicionar cliente"}</DialogTitle>
            <DialogDescription>{client ? "Edite as informações desse cliente." : "Adicione um novo cliente à sua empresa!"}</DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nome do cliente
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="register"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    CPF do cliente
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o CPF do cliente" {...field} />
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
                                <FormLabel>Telefone do cliente</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o telefone do cliente"
                                        {...field}
                                        onChange={e => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 11))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Salvando..."
                                : client ? "Editar cliente"
                                    : "Cadastrar cliente"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default UpsertClientForm;