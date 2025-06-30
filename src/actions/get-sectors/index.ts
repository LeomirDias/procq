"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { sectorsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const getSectors = actionClient
  .schema(
    z.object({
      sectorId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const sectors = await db.query.sectorsTable.findMany({
        where: eq(sectorsTable.id, parsedInput.sectorId),
        with: {
          servicePoints: true,
        },
      });

      if (!sectors) {
        throw new Error("Setores não encontrados");
      }

      return sectors;
    } catch (error) {
      console.error("[GET_SECTORS]", error);
      throw new Error("Erro ao buscar setores");
    }
  });
