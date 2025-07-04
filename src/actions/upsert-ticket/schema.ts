import { phoneNumber } from "better-auth/plugins";
import { z } from "zod";

export const UpdateTicketSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  sectorId: z.string().min(1, "ID do setor é obrigatório"),
  clientId: z.string().min(1, "ID do cliente é obrigatório"),
});

export const CreateTicketSchema = z.object({
  status: z.string().min(1, "Status é obrigatório"),
  sectorId: z.string().min(1, "ID do setor é obrigatório"),
  clientId: z.string().min(1, "ID do cliente é obrigatório"),
});

export type UpdateTicketSchema = z.infer<typeof UpdateTicketSchema>;
export type CreateTicketSchema = z.infer<typeof CreateTicketSchema>;
