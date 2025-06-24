import { z } from "zod";

export const updateUserDataSchema = z.object({
    userId: z.string(),
    cpf: z.string().min(1, "CPF é obrigatório"),
    phoneNumber: z.string().min(1, "Telefone é obrigatório"),
}); 