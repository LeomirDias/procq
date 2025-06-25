
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { sectorsTable } from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema,
    }),
    plugins: [
        customSession(async ({ user, session }) => {
            return {
                user: {
                    ...user,
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