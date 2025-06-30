import { z } from "zod";

export const schema = z.object({
  operationId: z.string().min(1, "Operação é obrigatória"),
});

export type Schema = z.infer<typeof schema>;
