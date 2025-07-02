"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const getClientByRegister = actionClient
  .schema(
    z.object({
      register: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const client = await db.query.clientsTable.findFirst({
        where: (client, { eq }) => eq(client.register, parsedInput.register),
      });

      return client || null;
    } catch (error) {
      throw new Error("Erro ao buscar consumidor");
    }
  });
