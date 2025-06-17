import { z } from "zod";

export const upsertProfessionalSchema = z
    .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1, { message: "Nome é obrigatório.", }),
        position: z.string().trim().min(1, { message: "Posição é obrigatória." }),
        phoneNumber: z.string().trim().min(1, { message: "Telefone é obrigatório." }),
        acessLevel: z.string().trim().min(1, { message: "Nível de acesso é obrigatório." }),
    })

export type upsertProfessionalSchema = z.infer<typeof upsertProfessionalSchema>;