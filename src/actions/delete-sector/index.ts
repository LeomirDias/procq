"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { sectorsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deleteSector = actionClient
    .schema(
        z.object({
            id: z.string().uuid(),
        }),
    )
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) {
            throw new Error("Unauthorized");
        }
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.user.id),
        });
        if (user?.role !== "administrator") throw new Error("Unauthorized");
        const sector = await db.query.sectorsTable.findFirst({
            where: eq(sectorsTable.id, parsedInput.id),
        });
        if (!sector) {
            throw new Error("Setor não encontrado");
        }
        await db.delete(sectorsTable).where(eq(sectorsTable.id, parsedInput.id));
        revalidatePath("/administrator/sectors");
    });