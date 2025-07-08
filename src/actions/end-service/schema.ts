import { z } from "zod";

export const EndServiceSchema = z.object({
  treatmentId: z.string().min(1, "ID do atendimento é obrigatório"),
});

export type Schema = z.infer<typeof EndServiceSchema>;
