import { z } from "zod";

export const AddTodoFormSchema = z.object({
  title: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Başlık en az 2 karakter olmalıdır.",
    }),
  content: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  dueDate: z.date().optional(),
});

export const AddCategorySchema = z.object({
  name: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Kategori adı en az 2 karakter olmalıdır.",
    }),
  color: z.string().optional(),
});

export const AddTagSchema = z.object({
  name: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Kategori adı en az 2 karakter olmalıdır.",
    }),
  color: z.string().optional(),
});

export const UpdateTodoSchema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Başlık en az 2 karakter olmalıdır.",
    }),
  content: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  dueDate: z.date().optional(),
});

export const UpdateCategorySchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Kategori adı en az 2 karakter olmalıdır.",
    }),
  color: z.string().optional(),
});

export const UpdateTagSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Başlık gereklidir.",
    })
    .min(2, {
      message: "Etiket adı en az 2 karakter olmalıdır.",
    }),
  color: z.string().optional(),
});
