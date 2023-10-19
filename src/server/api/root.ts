import { todoRouter } from "@/server/api/routers/todo";
import { createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { tagRouter } from "./routers/tag";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  category: categoryRouter,
  tag: tagRouter,
});

export type AppRouter = typeof appRouter;
