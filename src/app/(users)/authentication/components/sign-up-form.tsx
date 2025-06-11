"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"
import { useForm } from "react-hook-form";
import { z } from "zod";

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


const registerSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    email: z.string().trim().email({ message: "Email inválido" }),
    password: z.string().trim().min(8, { message: "Senha é obrigatória e deve ter pelo menos 8 caracteres" }),
})

export function SignUpForm() {

    const formRegister = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmitRegister(values: z.infer<typeof registerSchema>) {
        console.log(values)
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <Form {...formRegister}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-xl font-bold">Cadastre-se</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Crie sua conta
                                    </p>
                                </div>
                                <form onSubmit={formRegister.handleSubmit(onSubmitRegister)} className="space-y-8">
                                    <FormField
                                        control={formRegister.control}
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
                                        control={formRegister.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
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
                                                <FormLabel>Senha</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Senha" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Cadastrar</Button>
                                </form>
                            </div>
                        </Form>
                    </div>
                    <div className="bg-muted relative hidden md:block">
                        <Image
                            src="/horizontal.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover"
                            width={500}
                            height={500}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
