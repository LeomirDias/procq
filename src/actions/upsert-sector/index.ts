"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { sectorsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertSectorSchema } from "./schema";
import { eq } from "drizzle-orm";

export const upsertSector = actionClient
  .schema(upsertSectorSchema)
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
    await db
      .insert(sectorsTable)
      .values({
        ...parsedInput,
      })
      .onConflictDoUpdate({
        target: [sectorsTable.id],
        set: {
          ...parsedInput,
        },
      });
    revalidatePath("/administrator/sectors");
  });
