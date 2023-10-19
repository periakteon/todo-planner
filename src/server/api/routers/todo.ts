import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AddTodoFormSchema } from "@/utils/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

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
  getCategoriesAndTags: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Bunu yapmaya yetkiniz yoktur.",
      });
    }

    const categories = await ctx.db.category.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });

    const tags = await ctx.db.tag.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });

    return {
      categories,
      tags,
    };
  }),

  getUndoneTodos: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Bunu yapmaya yetkiniz yoktur.",
      });
    }

    const todos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.auth.userId,
        isDone: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        dueDate: true,
        isDone: true,
        categoryId: true,
        tagId: true,
        category: {
          select: {
            name: true,
            color: true,
          },
        },
        tag: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    return todos;
  }),

  getDoneTodos: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Bunu yapmaya yetkiniz yoktur.",
      });
    }

    const todos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.auth.userId,
        isDone: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        dueDate: true,
        isDone: true,
        categoryId: true,
        tagId: true,
        category: {
          select: {
            name: true,
            color: true,
          },
        },
        tag: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    return todos;
  }),

  deleteTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),

  tickTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isDone: input.status,
        },
      });
    }),
});
