"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { servicePointsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deleteServicePoint = actionClient
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
        const servicePoint = await db.query.servicePointsTable.findFirst({
            where: eq(servicePointsTable.id, parsedInput.id),
        });
        if (!servicePoint) {
            throw new Error("Ponto de atendimento não encontrado");
        }
        if (servicePoint.enterpriseId !== session.user.enterprise?.id) {
            throw new Error("Ponto de atendimento não encontrado");
        }
        await db.delete(servicePointsTable).where(eq(servicePointsTable.id, parsedInput.id));
        revalidatePath("/service-points");
    });