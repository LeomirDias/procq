import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const Home = async () => {

  // Busca e verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/authentication")
  }

  return (
    <div>
      <h1>Bem-vindo {session?.user?.name}</h1>
      <SignOutButton />
    </div>
  );
}

export default Home;