import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const ProfessionalDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/");
    }

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, session.user.id),
    });

    if (user?.role === "admin") {
        redirect("/administrator/dashboard");
    }


    return (
        <div>
            <h1>Dashboard do Profissional</h1>
            {/* Conteúdo do dashboard aqui */}
        </div>
    );
};

export default ProfessionalDashboardPage;