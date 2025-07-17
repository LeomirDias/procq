"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateUserData } from "@/actions/update-user-data";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth.client";
import { Separator } from "@/components/ui/separator";

const registerSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    email: z.string().trim().email({ message: "Email inválido" }),
    password: z.string().trim().min(8, { message: "Senha é obrigatória e deve ter pelo menos 8 caracteres" }),
    phoneNumber: z.string().trim().min(1, { message: "Telefone é obrigatório" }),
    cpf: z.string().trim().min(1, { message: "CPF é obrigatório" }),
})

export function SignUpForm() {
    const router = useRouter();

    const formRegister = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            cpf: "",
        },
    })

    async function onSubmitRegister(values: z.infer<typeof registerSchema>) {
        try {
            await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
            }, {
                onSuccess: async (ctx) => {
                    try {
                        await updateUserData({
                            userId: ctx.data.user.id,
                            cpf: values.cpf,
                            phoneNumber: values.phoneNumber,
                            role: 'administrator'
                        });
                        toast.success("Cadastro realizado com sucesso")
                        router.push("/users/dashboard")
                    } catch {
                        toast.error("Erro ao salvar dados adicionais")
                    }
                },
                onError: (ctx) => {
                    if (ctx.error.code === "USER_ALREADY_EXISTS" || ctx.error.code === "EMAIL_ALREADY_EXISTS") {
                        toast.error("Email já cadastrado, por favor faça login")
                        return;
                    } else {
                        toast.error("Erro ao cadastrar, por favor tente novamente")
                    }
                }
            })
        } catch {
            toast.error("Erro ao realizar cadastro")
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center">
                <Image
                    src="/Logo.svg"
                    alt="Procon Logo"
                    width={400}
                    height={0}
                    priority
                />
            </div>
            <Card className="overflow-hidden p-0 bg-[#f8f8f8]">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <Form {...formRegister}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-xl font-bold text-secondary">Crie sua conta</h1>
                                </div>
                                <form onSubmit={formRegister.handleSubmit(onSubmitRegister)} className="space-y-8">
                                    <FormField
                                        control={formRegister.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-secondary">Nome</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite seu nome"{...field} className="bg-[#f8f8f8] shadow-md" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-950">CPF</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite seu CPF"  {...field} className="bg-[#f8f8f8] shadow-md" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-950">Telefone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite seu telefone" {...field} className="bg-[#f8f8f8] shadow-md" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-950">Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite seu email" {...field} className="bg-[#f8f8f8] shadow-md" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-secondary">Senha</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Crie sua senha" type="password" {...field} className="bg-[#f8f8f8] shadow-md" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit"
                                        disabled={formRegister.formState.isSubmitting}>
                                        {formRegister.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
                                    </Button>
                                </form>
                            </div>
                        </Form>
                    </div>
                    <div className="bg-[#f8f8f8] w-full flex flex-col items-center justify-center h-full p-6">
                        <p className="text-secondary font-bold text-4xl text-center">Cadastro de <br /> Administrador</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
