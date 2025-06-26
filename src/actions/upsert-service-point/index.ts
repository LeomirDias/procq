"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { servicePointsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertServicePointSchema } from "./schema";

export const upsertServicePoint = actionClient
    .schema(upsertServicePointSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) {
            throw new Error("Unauthorized");
        }
        await db
            .insert(servicePointsTable)
            .values({
                ...parsedInput,
            })
            .onConflictDoUpdate({
                target: [servicePointsTable.id],
                set: {
                    ...parsedInput,
                },
            });
        revalidatePath("/administrator/sectors");
    });