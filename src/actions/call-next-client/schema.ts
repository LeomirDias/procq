import { z } from "zod";

export const CreateTreatmentSchema = z.object({
  ticketId: z.string().min(1, "ID do ticket é obrigatório"),
  operationId: z.string().min(1, "ID da operação é obrigatório"),
});

export type Schema = z.infer<typeof CreateTreatmentSchema>;
