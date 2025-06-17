"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { sectorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertSectorSchema } from "./schema";

export const upsertSector = actionClient
    .schema(upsertSectorSchema)
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
            .insert(sectorsTable)
            .values({
                ...parsedInput,
                enterpriseId: session?.user.enterprise?.id,
            })
            .onConflictDoUpdate({
                target: [sectorsTable.id],
                set: {
                    ...parsedInput,
                },
            });
        revalidatePath("/admins/sectors");
    });