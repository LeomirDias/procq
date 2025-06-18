import { z } from "zod";

export const upsertProfessionalSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1, { message: "Nome é obrigatório.", }),
        register: z.string().trim().min(1, { message: "Registro é obrigatório." }),
        position: z.string().trim().min(1, { message: "Posição é obrigatória." }),
        acessLevel: z.string().trim().min(1, { message: "Nível de acesso é obrigatório." }),
        availability: z.enum(["free", "busy", "unavailable"]).default("free"),
        sectorId: z.string().uuid(),
    })

export type upsertProfessionalSchema = z.infer<typeof upsertProfessionalSchema>;