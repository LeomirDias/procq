"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { operationsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { ErrorTypes, ErrorMessages } from "./schema";
import { schema } from "./schema";
import { revalidatePath } from "next/cache";

export const finishOperation = actionClient
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

    await db
      .update(operationsTable)
      .set({
        status: "finished",
        updatedAt: new Date(),
      })
      .where(eq(operationsTable.id, parsedInput.operationId));

    revalidatePath("/professional/dashboard");
  });
