import {
  treatmentsTable,
  operationsTable,
  usersTable,
  servicePointsTable,
  clientsTable,
  ticketsTable,
} from "@/db/schema";
import { db } from "@/db";
import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";

interface Params {
  session?: any; // Não é mais usado
  from: Date;
  to: Date;
}

const getDashboard = async ({ from, to }: Params) => {
  // Top profissionais no período
  const topProfessionals = await db
    .select({
      professionalId: operationsTable.userId,
      name: usersTable.name,
      total: count(treatmentsTable.id).as("total"),
    })
    .from(treatmentsTable)
    .leftJoin(
      operationsTable,
      eq(treatmentsTable.operationId, operationsTable.id),
    )
    .leftJoin(usersTable, eq(operationsTable.userId, usersTable.id))
    .where(
      and(
        gte(treatmentsTable.createdAT, from),
        lte(treatmentsTable.createdAT, to),
      ),
    )
    .groupBy(operationsTable.userId, usersTable.name)
    .orderBy(desc(sql<number>`count(*)`))
    .limit(10);

  // Total de atendimentos realizados no período
  const totalTreatments = await db
    .select({
      total: count(treatmentsTable.id),
    })
    .from(treatmentsTable)
    .where(
      and(
        gte(treatmentsTable.createdAT, from),
        lte(treatmentsTable.createdAT, to),
      ),
    )
    .then((res) => res[0]?.total || 0);

  // Total de novos clientes no período
  const totalNewClients = await db
    .select({
      total: count(clientsTable.id),
    })
    .from(clientsTable)
    .where(
      and(gte(clientsTable.createdAT, from), lte(clientsTable.createdAT, to)),
    )
    .then((res) => res[0]?.total || 0);

  // Total de atendimentos cancelados no período (tickets com status canceled)
  const totalCanceledAppointments = await db
    .select({
      total: count(ticketsTable.id),
    })
    .from(ticketsTable)
    .where(
      and(
        gte(ticketsTable.createdAT, from),
        lte(ticketsTable.createdAT, to),
        eq(ticketsTable.status, "canceled"),
      ),
    )
    .then((res) => res[0]?.total || 0);

  return {
    topProfessionals,
    totalTreatments,
    totalNewClients,
    totalCanceledAppointments,
  };
};

export default getDashboard;
