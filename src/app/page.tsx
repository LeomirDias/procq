import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const Home = async () => {
  // Busca e verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/authentication")
  } else {
    redirect("/users-home")
  }
}

export default Home;