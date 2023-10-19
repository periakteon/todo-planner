import { z } from "zod";

export const AddTodoFormSchema = z.object({
  title: z.string({
    required_error: "Başlık gereklidir.",
  }),
  content: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  dueDate: z.date().optional(),
});
