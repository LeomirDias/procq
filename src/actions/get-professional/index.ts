"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const getUser = actionClient
    .schema(
        z.object({
            userId: z.string(),
        }),
    )
    .action(async ({ parsedInput }) => {
        try {
            const user = await db.query.usersTable.findFirst({
                where: eq(usersTable.id, parsedInput.userId),
                with: {
                    enterprise: true,
                }
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            return user;
        } catch (error) {
            console.error("[GET_USER]", error);
            throw new Error("Erro ao buscar usuário");
        }
    }); 