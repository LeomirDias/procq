
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import AdministratorLoginForm from "./_components/administrator-login-form";
import ProfessionalLoginForm from "./_components/professional-login-form";

const AuthenticationPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect("/administrator/dashboard")
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-auto max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Procon Itumbiara</h1>
          {/* <p className="text-muted-foreground">Gerencie seus atendimentos com facilidade</p> */}
        </div>
        <Tabs defaultValue="administrator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="administrator" className="w-full p-2">Entrar como Administrador</TabsTrigger>
            <TabsTrigger value="professional" className="w-full p-2">Entrar como Profissional</TabsTrigger>
          </TabsList>
          <TabsContent value="administrator">
            <AdministratorLoginForm />
          </TabsContent>
          <TabsContent value="professional">
            <ProfessionalLoginForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-muted-foreground mt-2 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}

export default AuthenticationPage;