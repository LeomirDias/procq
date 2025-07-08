"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { treatmentsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { EndServiceSchema } from "./schema";

import { revalidatePath } from "next/cache";

export const endService = actionClient.schema(EndServiceSchema).action(async ({ parsedInput }) => {
    const treatment = await db.query.treatmentsTable.findFirst({
        where: eq(treatmentsTable.id, parsedInput.treatmentId),
    });
    if (!treatment) {
        throw new Error("Atendimento não encontrado");
    }

    await db.update(treatmentsTable)
        .set({ status: "finished" })
        .where(eq(treatmentsTable.id, treatment.id));

    revalidatePath("/professional/professionals-services");
});
