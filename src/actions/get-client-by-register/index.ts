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
      const clients = await db.query.clientsTable.findMany({
        where: eq(clientsTable.register, parsedInput.register),
      });

      if (!clients || clients.length === 0) {
        throw new Error("Cliente não encontrado");
      }

      return clients[0];
    } catch (error) {
      console.error("[GET_CLIENT_BY_REGISTER]", error);
      throw new Error("Erro ao buscar cliente");
    }
  });

export const getAllClients = actionClient.action(async () => {
  try {
    const clients = await db.query.clientsTable.findMany();
    return clients;
  } catch (error) {
    console.error("[GET_ALL_CLIENTS]", error);
    throw new Error("Erro ao buscar clientes");
  }
});
