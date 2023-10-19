import { todoRouter } from "@/server/api/routers/todo";
import { createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/category";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
