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

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email ou senha inválidos" }),
  password: z.string().trim().min(8, { message: "Email ou senha inválidos" }),
})


export function LoginForm() {

  const formLogin = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmitLogin(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }



  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <Form {...formLogin}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-muted-foreground text-balance">
                    Faça login na sua conta
                  </p>
                </div>
                <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-8">
                  <FormField
                    control={formLogin.control}
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
                    control={formLogin.control}
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
                  <Button type="submit">Entrar</Button>
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
