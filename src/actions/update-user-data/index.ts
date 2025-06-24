"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

import { updateUserDataSchema } from "./schema";

export const updateUserData = actionClient
    .schema(updateUserDataSchema)
    .action(async ({ parsedInput }) => {
        try {
            await db
                .update(usersTable)
                .set({
                    cpf: parsedInput.cpf,
                    phoneNumber: parsedInput.phoneNumber,
                    role: parsedInput.role || 'admin',
                    updatedAt: new Date(),
                })
                .where(eq(usersTable.id, parsedInput.userId));

            return { success: true };
        } catch (error) {
            console.error("[UPDATE_USER_DATA]", error);
            throw new Error("Erro ao atualizar dados do usuário");
        }
    }); 