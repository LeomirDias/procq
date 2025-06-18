import { z } from "zod";

export const upsertServicePointSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1, { message: "Nome é obrigatório.", }),
        isActive: z.enum(["active", "inactive", "paused"]).default("active"),
        sectorId: z.string().uuid(),
    })

export type UpsertServicePointSchema = z.infer<typeof upsertServicePointSchema>;