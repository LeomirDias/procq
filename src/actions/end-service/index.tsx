"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { treatmentsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { EndServiceSchema } from "./schema";
import { ErrorTypes, ErrorMessages } from "./schema";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const endService = actionClient.schema(EndServiceSchema).action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        return { error: { type: ErrorTypes.UNAUTHENTICATED, message: ErrorMessages[ErrorTypes.UNAUTHENTICATED] } };
    }

    const treatment = await db.query.treatmentsTable.findFirst({
        where: eq(treatmentsTable.id, parsedInput.treatmentId),
    });
    if (!treatment) {
        return { error: { type: ErrorTypes.TREATMENT_NOT_FOUND, message: ErrorMessages[ErrorTypes.TREATMENT_NOT_FOUND] } };
    }

    if (treatment.status !== "in_service") {
        return { error: { type: ErrorTypes.TREATMENT_NOT_IN_SERVICE, message: ErrorMessages[ErrorTypes.TREATMENT_NOT_IN_SERVICE] } };
    }

    await db.update(treatmentsTable)
        .set({ status: "finished" })
        .where(eq(treatmentsTable.id, treatment.id));

    revalidatePath("/professional/professionals-services");
});
