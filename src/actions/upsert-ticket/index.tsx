"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { ticketsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { UpdateTicketSchema, CreateTicketSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const updateTicket = actionClient
    .schema(UpdateTicketSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Usuário não autenticado");
        }

        // Buscar ticket atual para manter sectorId e clientId
        const ticket = await db.query.ticketsTable.findFirst({ where: eq(ticketsTable.id, parsedInput.id) });
        if (!ticket) throw new Error('Ticket não encontrado');
        await db
            .update(ticketsTable)
            .set({
                status: 'canceled',
                sectorId: ticket.sectorId,
                clientId: ticket.clientId,
            })
            .where(eq(ticketsTable.id, parsedInput.id));

        revalidatePath("/users/pending-appointments");
    });

export const createTicket = actionClient
    .schema(CreateTicketSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Usuário não autenticado");
        }

        await db.insert(ticketsTable).values({
            status: parsedInput.status,
            sectorId: parsedInput.sectorId,
            clientId: parsedInput.clientId,
        });

        revalidatePath("/users/pending-appointments");
    });
