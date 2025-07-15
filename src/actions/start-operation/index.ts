"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { operationsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { ErrorMessages, ErrorTypes, schema } from "./schema";
import { revalidatePath } from "next/cache";

export const startOperation = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        error: {
          type: ErrorTypes.UNAUTHENTICATED,
          message: ErrorMessages[ErrorTypes.UNAUTHENTICATED],
        },
      };
    }

    await db.insert(operationsTable).values({
      status: "operating",
      userId: session.user.id,
      servicePointId: parsedInput.servicePointId,
    });

    revalidatePath("/professional/dashboard");
  });
