import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AddCategorySchema } from "@/utils/schemas";

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
});
