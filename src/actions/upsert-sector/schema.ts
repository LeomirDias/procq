import { z } from "zod";

export const upsertSectorSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1, { message: "Nome é obrigatório.", }),
    })

export type upsertSectorSchema = z.infer<typeof upsertSectorSchema>;