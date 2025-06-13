import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";


const AuthenticationPage = async () => {

  // Busca e verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect("/")
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className=" text-center mb-4">
          <h1 className="text-2xl font-bold">WiseFlow</h1>
          <p className="text-muted-foreground">Gerencie seus atendimentos com facilidade</p>
        </div>
        <Tabs defaultValue="login">
          <TabsList className="w-1/2 gap-2">
            <TabsTrigger value="login" className="bg-background text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Entrar</TabsTrigger>
            <TabsTrigger value="register" className="bg-background text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-muted-foreground mt-2 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}

export default AuthenticationPage;