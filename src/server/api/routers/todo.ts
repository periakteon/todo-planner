import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AddTodoFormSchema } from "@/utils/schemas";
import { Prisma } from "@prisma/client";

export const todoRouter = createTRPCRouter({
  addTodo: protectedProcedure
    .input(AddTodoFormSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      try {
        await ctx.db.todo.create({
          data: {
            title: input.title,
            content: input.content,
            userId: ctx.auth.userId,
            categoryId: input.category,
            tagId: input.tag,
            dueDate: input.dueDate,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const meta = error.meta?.field_name;

          if (error.code === "P2003") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Seçmiş olduğunuz ${
                meta === "categoryId" ? "kategori" : "etiket"
              } bulunamadı.`,
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Bir hata oluştu.",
        });
      }
    }),
});
