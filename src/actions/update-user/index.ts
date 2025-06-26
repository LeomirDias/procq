"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { schema } from "./schema";
import { revalidatePath } from "next/cache";

export const updateUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, session.user.id),
    });
    if (user?.role !== "administrator") throw new Error("Unauthorized");

    await db
      .update(usersTable)
      .set({ name: parsedInput.name, phoneNumber: parsedInput.phoneNumber, cpf: parsedInput.cpf, role: parsedInput.role })
      .where(eq(usersTable.id, parsedInput.id));

    revalidatePath("/administrator/users-professionals");
  });
