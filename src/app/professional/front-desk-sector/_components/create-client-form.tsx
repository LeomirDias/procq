"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InsertClientSchema } from "@/actions/upsert-client/schema";
import { insertClient } from "@/actions/upsert-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { getClientByRegister } from "@/actions/get-client-by-register";

const CreateClientForm = () => {
    const form = useForm<z.infer<typeof InsertClientSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(InsertClientSchema),
        defaultValues: {
            name: "",
            register: "",
            phoneNumber: "",
        }
    });

    const insertClientAction = useAction(insertClient, {
        onSuccess: () => {
            toast.success("Consumidor cadastrado com sucesso!");
            form.reset();
        },
        onError: (error) => {
            toast.error("Erro ao cadastrar consumidor.");
        },
    });

    const onSubmit = async (values: z.infer<typeof InsertClientSchema>) => {
        // Verifica se já existe cliente com o CPF informado
        const existingClient = await getClientByRegister({ register: values.register });
        if (existingClient) {
            toast.error("Consumidor já possui cadastro");
            return;
        } else insertClientAction.execute(values);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <h1 className="text-lg font-bold">Cadastrar consumidor</h1>
                <p className="text-sm text-gray-500">Cadastre um novo consumidor no sistema.</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome" {...field} />
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
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CPF" {...field} />
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
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Telefone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={insertClientAction.isPending}>
                            {insertClientAction.isPending ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...</>
                            ) : "Cadastrar"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default CreateClientForm;