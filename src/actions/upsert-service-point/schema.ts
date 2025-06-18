import { z } from "zod";

export const upsertServicePointSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1, { message: "Nome é obrigatório.", }),
        availability: z.enum(["free", "busy", "unavailable"]).default("free"),
        sectorId: z.string().uuid(),
    })

export type UpsertServicePointSchema = z.infer<typeof upsertServicePointSchema>;