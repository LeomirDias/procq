import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import AdministratorLoginForm from "./_components/administrator-login-form";
import ProfessionalLoginForm from "./_components/professional-login-form";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect("/users/dashboard")
  }

  return (
    <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
      <div className="min-h-svh flex flex-col items-center justify-center bg-[#f8f8f8]">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/Logo.svg"
            alt="Procon Logo"
            width={200}
            height={80}
            priority
          />
          <div className="w-auto max-w-lg rounded-md">
            <Tabs defaultValue="administrator" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="administrator" className="w-full p-2 cursor-pointer">Entrar como administrador</TabsTrigger>
                <TabsTrigger value="professional" className="w-full p-2 cursor-pointer">Entrar como profissional</TabsTrigger>
              </TabsList>
              <TabsContent value="administrator">
                <AdministratorLoginForm />
              </TabsContent>
              <TabsContent value="professional">
                <ProfessionalLoginForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AuthenticationPage;