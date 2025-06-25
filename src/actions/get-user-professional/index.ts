import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const getProfessionals = actionClient
    .schema(z.object({}))
    .action(async () => {
        try {
            const professionals = await db.query.usersTable.findMany({
                where: (row) => eq(row.role, "professional"),
            });

            return professionals;
        } catch (error) {
            console.error("[GET_PROFESSIONALS]", error);
            throw new Error("Erro ao buscar profissionais");
        }
    }); 