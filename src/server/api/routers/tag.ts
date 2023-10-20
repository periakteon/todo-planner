import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AddTagSchema, UpdateTagSchema } from "@/utils/schemas";
import { z } from "zod";

export const tagRouter = createTRPCRouter({
  addTag: protectedProcedure
    .input(AddTagSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.tag.create({
        data: {
          name: input.name,
          color: input.color ?? "#c0c1c2",
          userId: ctx.auth.userId,
        },
      });
    }),

  getTags: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Bunu yapmaya yetkiniz yoktur.",
      });
    }

    const tags = await ctx.db.tag.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });

    return tags;
  }),

  updateTag: protectedProcedure
    .input(UpdateTagSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.tag.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          color: input.color ?? "#c0c1c2",
        },
      });
    }),

  deleteTag: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bunu yapmaya yetkiniz yoktur.",
        });
      }

      await ctx.db.tag.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
