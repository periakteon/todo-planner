import { todoRouter } from "@/server/api/routers/todo";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
