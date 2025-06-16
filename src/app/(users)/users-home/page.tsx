import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToEnterprisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";


const Home = async () => {

    // Busca e verifica se o usuário está autenticado
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        redirect("/authentication")
    }

    const enterprise = await db.query.usersToEnterprisesTable.findMany({

        where: eq(usersToEnterprisesTable.userId, session?.user.id)
    })

    if (enterprise.length === 0) {
        redirect("/enterprise-form")
    }

    return (
        <div>
            <h1>Bem-vindo {session?.user?.name}</h1>
        </div>
    );
}

export default Home;