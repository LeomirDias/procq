"use server";

import { eq, and, asc } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { treatmentsTable, ticketsTable, operationsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { revalidatePath } from "next/cache";

export const callNextTicket = actionClient.action(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Usuário não autenticado");
    }

    // Buscar operação ativa do usuário logado
    const operation = await db.query.operationsTable.findFirst({
        where: and(
            eq(operationsTable.userId, session.user.id),
            eq(operationsTable.status, "operating")
        ),
    });
    if (!operation) {
        throw new Error("Nenhuma operação ativa encontrada para o usuário logado");
    }

    // Buscar ticket pendente mais antigo
    const ticket = await db.query.ticketsTable.findFirst({
        where: eq(ticketsTable.status, "pending"),
        orderBy: (ticketsTable) => asc(ticketsTable.createdAT),
    });
    if (!ticket) {
        throw new Error("Nenhum ticket pendente encontrado");
    }

    await db.insert(treatmentsTable).values({
        ticketId: ticket.id,
        operationId: operation.id,
    });

    // Atualizar status do ticket para 'finished'
    await db.update(ticketsTable)
        .set({ status: "finished" })
        .where(eq(ticketsTable.id, ticket.id));

    revalidatePath("/professional/professionals-services");
});
