import { z } from "zod";

export const schema = z.object({
  servicePointId: z.string().min(1, "Ponto de serviço é obrigatório"),
});

export type Schema = z.infer<typeof schema>;
