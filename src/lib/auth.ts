
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { sectorsTable, usersToEnterprisesTable } from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema,
    }),
    plugins: [
        customSession(async ({ user, session }) => {
            const enterprises = await db.query.usersToEnterprisesTable.findMany({
                where: eq(usersToEnterprisesTable.userId, user.id),
                with: {
                    enterprise: true,
                }
            });
            const enterprise = enterprises?.[0];
            const sectors = await db.query.sectorsTable.findMany({
                where: eq(sectorsTable.enterpriseId, enterprise?.enterpriseId),
            });
            return {
                user: {
                    ...user,
                    enterprise: {
                        id: enterprise?.enterpriseId,
                        name: enterprise?.enterprise.name,
                        slug: enterprise?.enterprise.slug,
                        register: enterprise?.enterprise.register,
                        phoneNumber: enterprise?.enterprise.phoneNumber,
                        unityNumber: enterprise?.enterprise.unityNumber,
                    },
                    sectors: sectors,
                },
                session,
            }
        }),
    ],
    user: {
        modelName: "usersTable",
    },
    session: {
        modelName: "sessionsTable",
    },
    account: {
        modelName: "accountsTable",
    },
    verification: {
        modelName: "verificationsTable",
    },
    emailAndPassword: {
        enabled: true,
    },
});