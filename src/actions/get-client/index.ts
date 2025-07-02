"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { clientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const getClient = actionClient
  .schema(
    z.object({
      sectorId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const sectors = await db.query.clientsTable.findMany({
        where: eq(clientsTable.id, parsedInput.sectorId),
      });

      if (!sectors) {
        throw new Error("Consumidores não encontrados");
      }

      return sectors;
    } catch (error) {
      throw new Error("Erro ao buscar consumidor");
    }
  });
