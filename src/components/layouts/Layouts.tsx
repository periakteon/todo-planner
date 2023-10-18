import LandingPageLayout from "./landing-page/LandingPageLayout";
import TodoPageLayout from "./todo-page/TodoPageLayout";
import NoLayout from "./NoLayout";

export const Layouts = {
  LandingPage: LandingPageLayout,
  TodoPage: TodoPageLayout,
  NoLayout: NoLayout,
};

export type LayoutKeys = keyof typeof Layouts;
