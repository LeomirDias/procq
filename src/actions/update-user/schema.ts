import { z } from "zod";

export const schema = z.object({
    id: z.string().min(1, "ID é obrigatório"),
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
    phoneNumber: z.string().min(11, "O telefone deve ter pelo menos 11 caracteres").optional(),
    cpf: z.string().min(11, "O CPF deve ter pelo menos 11 caracteres").optional(),
    role: z.string().min(3, "O cargo deve ter pelo menos 3 caracteres").optional(),
});

export type Schema = z.infer<typeof schema>;
