"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email ou senha inválidos" }),
  password: z.string().trim().min(8, { message: "Email ou senha inválidos" }),
})


const ProfessionalLoginForm = () => {
  const router = useRouter();
  const formLogin = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmitLogin(values: z.infer<typeof loginSchema>) {

    await authClient.signIn.email({
      email: values.email,
      password: values.password,
    }, {
      onSuccess: () => {
        toast.success("Login realizado com sucesso")
        router.push("/professional/dashboard")
      },
      onError: () => {
        toast.error("Email ou senha inválidos")
      }
    })
  }



  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0">
        <div className="mx-auto w-full max-w-md p-6 md:p-8">
          <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-4">
              <CardHeader className="p-0">
                <CardTitle>Área do Profissional</CardTitle>
                <CardDescription>
                  Faça login na sua conta
                </CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <FormField
                  control={formLogin.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
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
                        <Input type="password" placeholder="Digite sua senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="p-0">
                <Button type="submit" className="w-full" disabled={formLogin.formState.isSubmitting}>
                  {formLogin.formState.isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionalLoginForm;