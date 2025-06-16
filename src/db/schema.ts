import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//Usuários
export const usersTable = pgTable("users", {
    id: text("id").primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    plan: text('plan'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const sessionsTable = pgTable("sessions", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' })
});

export const accountsTable = pgTable("accounts", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verificationsTable = pgTable("verifications", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

//Tabela para armazenar empresas
export const enterprisesTable = pgTable("enterprises", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    register: text("register").notNull(),
    unityNumber: text("unity_number"),
    phoneNumber: text("phone_number").notNull(),
    slug: text("slug").notNull().unique(),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Tabela para armazenar profissionais
export const professionalsTable = pgTable("professionals", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    position: text("position").notNull(),
    phoneNumber: text("phone_number").notNull(),
    acessLevel: text("acess_level").notNull().default("professional"),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    //Relationships
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    sectorId: uuid("sector_id")
        .notNull()
        .references(() => sectorsTable.id, { onDelete: "cascade" }),
});

//Tabela para armazenar setores
export const sectorsTable = pgTable("sectors", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
});

//Tabela para armazenar pontos de serviço
export const servicePointsTable = pgTable("service_points", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
});

//Tabela para armazenar clientes
export const clientsTable = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    register: text("register").notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
});


//Tabela para armazenar tickets
export const ticketsTable = pgTable("tickets", {
    id: uuid("id").primaryKey().defaultRandom(),
    number: integer("number").notNull(),
    status: text("status").notNull().default("pending"),
    priority: text("priority").notNull().default("common"),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    sectorId: uuid("sector_id")
        .notNull()
        .references(() => sectorsTable.id, { onDelete: "cascade" }),
    servicePointId: uuid("service_point_id")
        .notNull()
        .references(() => servicePointsTable.id, { onDelete: "cascade" }),
    clientId: uuid("client_id")
        .notNull()
        .references(() => clientsTable.id, { onDelete: "cascade" }),
});


//Tabela para armazenar atendimentos
export const treatmentsTable = pgTable("treatments", {
    id: uuid("id").primaryKey().defaultRandom(),
    status: text("status").notNull().default("pending"),
    durationInMinutes: integer("duration_in_minutes").notNull(),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    ticketId: uuid("ticket_id")
        .notNull()
        .references(() => ticketsTable.id, { onDelete: "cascade" }),
    professionalId: uuid("professional_id")
        .notNull()
        .references(() => professionalsTable.id, { onDelete: "cascade" }),
    clientId: uuid("client_id")
        .notNull()
        .references(() => clientsTable.id, { onDelete: "cascade" }),
})

//Tabela para armazenar planos
export const plansTable = pgTable("plans", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    maxEnterprises: integer("max_enterprises").notNull().default(1),
    maxProfessionals: integer("max_professionals").notNull().default(1),
    maxClients: integer("max_clients").notNull().default(1),
    maxServicePoints: integer("max_service_points").notNull().default(1),
    priceInCents: integer("price_in_cents").notNull(),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
});


//Relationships

//Users table relationships
export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToEnterprises: many(usersToEnterprisesTable),
}));

//Mid Table for relation N-N Users & Enterprises
export const usersToEnterprisesTable = pgTable("users_to_enterprises", {
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Mid table "usersToEnterprisesTable" relations table
export const usersToEnterprisesTableRelations = relations(usersToEnterprisesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersToEnterprisesTable.userId],
        references: [usersTable.id],
    }),
    enterprise: one(enterprisesTable, {
        fields: [usersToEnterprisesTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
}));

//Enterprises tables relationships
export const enterpriseTablesRelations = relations(enterprisesTable, ({ many, one }) => ({
    professionals: many(professionalsTable),
    sectors: many(sectorsTable),
    clients: many(clientsTable),
    tickets: many(ticketsTable),
    treatments: many(treatmentsTable),
    plan: one(plansTable),
    usersToEnterprises: many(usersToEnterprisesTable),
}));

//Professionals tables relationships
export const professionalsTableRelations = relations(professionalsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [professionalsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    sector: one(sectorsTable, {
        fields: [professionalsTable.sectorId],
        references: [sectorsTable.id],
    }),
    treatments: many(treatmentsTable),
}));

//Sectors tables relationships
export const sectorsTableRelations = relations(sectorsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [sectorsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    professionals: many(professionalsTable),
}));

//Clients tables relationships
export const clientsTableRelations = relations(clientsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [clientsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    tickets: many(ticketsTable),
    treatments: many(treatmentsTable),
}));


//Tickets relations
export const ticketsTableRelations = relations(ticketsTable, ({ one }) => ({
    enterprise: one(enterprisesTable, {
        fields: [ticketsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    client: one(clientsTable, {
        fields: [ticketsTable.clientId],
        references: [clientsTable.id],
    }),
    treatment: one(treatmentsTable),
}));

//Treatments tables relationships
export const treatmentsTableRelations = relations(treatmentsTable, ({ one }) => ({
    enterprise: one(enterprisesTable, {
        fields: [treatmentsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    ticket: one(ticketsTable, {
        fields: [treatmentsTable.ticketId],
        references: [ticketsTable.id],
    }),
    professional: one(professionalsTable, {
        fields: [treatmentsTable.professionalId],
        references: [professionalsTable.id],
    }),
    client: one(clientsTable, {
        fields: [treatmentsTable.clientId],
        references: [clientsTable.id],
    }),
}));

//Plans tables relationships
export const plansTableRelations = relations(plansTable, ({ one }) => ({
    enterprise: one(enterprisesTable, {
        fields: [plansTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
}));

