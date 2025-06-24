import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//Usuários
export const usersTable = pgTable("users", {
    id: text("id").primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    cpf: text("cpf").unique(),
    phoneNumber: text("phone_number").unique(),
    role: text('role').notNull().default('user'),
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
    availability: text("availability").default("free"),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    sectorId: uuid("sector_id")
        .notNull()
        .references(() => sectorsTable.id, { onDelete: "cascade" }),
});

//Tabela para armazenar operações de profissionais em pontos de serviço
export const operationsTable = pgTable("operations", {
    id: uuid("id").primaryKey().defaultRandom(),
    status: text("status").notNull().default("active"),
    createdAT: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
    //Relationships
    enterpriseId: uuid("enterprise_id")
        .notNull()
        .references(() => enterprisesTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    servicePointId: uuid("service_point_id")
        .notNull()
        .references(() => servicePointsTable.id, { onDelete: "cascade" }),
});


//Tabela para armazenar clientes
export const clientsTable = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    register: text("register").unique().notNull(),
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
    clientId: uuid("client_id")
        .notNull()
        .references(() => clientsTable.id, { onDelete: "cascade" }),
    operationId: uuid("operation_id")
        .notNull()
        .references(() => operationsTable.id, { onDelete: "cascade" }),
})

//Relationships

//Users table relationships
export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToEnterprises: many(usersToEnterprisesTable),
    operations: many(operationsTable),
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
export const enterpriseTablesRelations = relations(enterprisesTable, ({ many }) => ({
    sectors: many(sectorsTable),
    clients: many(clientsTable),
    tickets: many(ticketsTable),
    treatments: many(treatmentsTable),
    usersToEnterprises: many(usersToEnterprisesTable),
}));

//Sectors tables relationships
export const sectorsTableRelations = relations(sectorsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [sectorsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    users: many(usersTable),
    servicePoints: many(servicePointsTable),
    tickets: many(ticketsTable),
}));

//Operations tables relationships
export const operationsTableRelations = relations(operationsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [operationsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    user: one(usersTable, {
        fields: [operationsTable.userId],
        references: [usersTable.id],
    }),
    servicePoint: one(servicePointsTable, {
        fields: [operationsTable.servicePointId],
        references: [servicePointsTable.id],
    }),
    treatments: many(treatmentsTable),
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

//Service points tables relationships
export const servicePointsTableRelations = relations(servicePointsTable, ({ one, many }) => ({
    enterprise: one(enterprisesTable, {
        fields: [servicePointsTable.enterpriseId],
        references: [enterprisesTable.id],
    }),
    sector: one(sectorsTable, {
        fields: [servicePointsTable.sectorId],
        references: [sectorsTable.id],
    }),
    operations: many(operationsTable),
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
    client: one(clientsTable, {
        fields: [treatmentsTable.clientId],
        references: [clientsTable.id],
    }),
    operation: one(operationsTable, {
        fields: [treatmentsTable.operationId],
        references: [operationsTable.id],
    }),
}));

