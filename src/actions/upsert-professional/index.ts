"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { professionalsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertProfessionalSchema } from "./schema";

export const upsertProfessional = actionClient
    .schema(upsertProfessionalSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) {
            throw new Error("Unauthorized");
        }
        if (!session?.user.enterprise?.id) {
            throw new Error("Enterprise not found");
        }
        await db
            .insert(professionalsTable)
            .values({
                ...parsedInput,
                enterpriseId: session?.user.enterprise?.id,
            })
            .onConflictDoUpdate({
                target: [professionalsTable.id],
                set: {
                    ...parsedInput,
                },
            });
        revalidatePath("/admins/professionals");
    });