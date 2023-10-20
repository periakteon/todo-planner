import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AddCategorySchema, UpdateCategorySchema } from "@/utils/schemas";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  addCategory: protectedProcedure
    .input(AddCategorySchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.category.create({
        data: {
          name: input.name,
          color: input.color ?? "#c0c1c2",
          userId: ctx.auth.userId,
        },
      });
    }),

  getCategories: protectedProcedure.query(async ({ ctx }) => {
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
    });

    return categories;
  }),

  updateCategory: protectedProcedure
    .input(UpdateCategorySchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          color: input.color ?? "#c0c1c2",
        },
      });
    }),

  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
