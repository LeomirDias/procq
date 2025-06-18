// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

import DirectByAccessButton from "@/components/ui/direct-by-access-button";
// import { auth } from "@/lib/auth";

const Home = async () => {
  // Busca e verifica se o usuário está autenticado
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })

  // if (!session?.user) {
  //   redirect("/admins/authentication")
  // } else {
  //   redirect("/admins/dashboard")
  // }


  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Selecione o tipo de acesso</h1>
      <DirectByAccessButton />
    </div>
  )
}



export default Home;
//LOGIN VIRÁ PARA ESSA PÁGINA QUE FARÁ A DIFERENÇA ENTRE USUÁRIO E COLABORADOR