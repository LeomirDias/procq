import {
  treatmentsTable,
  operationsTable,
  usersTable,
  servicePointsTable,
} from "@/db/schema";
import { db } from "@/db";
import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import dayjs from "dayjs";

interface Params {
  session: { user: { enterprise: { id: string } } };
}

const getDashboard = async ({ session }: Params) => {
  const enterpriseId = session.user.enterprise.id;

  const now = dayjs();
  const todayStart = now.startOf("day").toDate();
  const todayEnd = now.endOf("day").toDate();
  const weekStart = now.subtract(7, "day").startOf("day").toDate();
  const monthStart = now.subtract(30, "day").startOf("day").toDate();

  // 1. Tratamentos em andamento
  const inServiceTreatments = await db.query.treatmentsTable.findMany({
    where: and(eq(treatmentsTable.status, "in_service")),
    with: {
      operation: {
        with: {
          user: true, // nome do profissional
          servicePoint: true, // ponto de serviço
        },
      },
    },
  });

  // Função genérica para top profissionais por período
  const topProfessionals = async (from: Date, to: Date) =>
    db
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
      .limit(5);

  const [topProfessionalsToday, topProfessionalsWeek, topProfessionalsMonth] =
    await Promise.all([
      topProfessionals(todayStart, todayEnd),
      topProfessionals(weekStart, todayEnd),
      topProfessionals(monthStart, todayEnd),
    ]);

  // Função genérica para contar total de tratamentos por período
  const treatmentCount = async (from: Date, to: Date) =>
    db
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

  const [totalToday, totalWeek, totalMonth] = await Promise.all([
    treatmentCount(todayStart, todayEnd),
    treatmentCount(weekStart, todayEnd),
    treatmentCount(monthStart, todayEnd),
  ]);

  return {
    inServiceTreatments,
    topProfessionalsToday,
    topProfessionalsWeek,
    topProfessionalsMonth,
    totalTreatments: {
      today: totalToday,
      week: totalWeek,
      month: totalMonth,
    },
  };
};

export default getDashboard;
