"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { clientsTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { UpsertClientschema, InsertClientSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const updateUser = actionClient
  .schema(UpsertClientschema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    await db
      .update(clientsTable)
      .set({
        name: parsedInput.name,
        register: parsedInput.register,
        phoneNumber: parsedInput.phoneNumber,
      })
      .where(eq(clientsTable.id, parsedInput.id));

    revalidatePath("/professional/front-desk-sector");
    revalidatePath("/administrator/clients");
    revalidatePath("/administrator/dashboard");
  });

export const insertClient = actionClient
  .schema(InsertClientSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    await db.insert(clientsTable).values({
      name: parsedInput.name,
      register: parsedInput.register,
      phoneNumber: parsedInput.phoneNumber,
    });

    revalidatePath("/users/consumer-research");
  });
