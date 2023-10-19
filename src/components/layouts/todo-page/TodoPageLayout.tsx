import React, { type PropsWithChildren } from "react";
import TodoPageSidebar from "./Sidebar";
import { Raleway } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import NotLoggedIn from "./NotLoggedIn";
import TodoPageFallback from "./TodoPageFallback";

const raleway = Raleway({ subsets: ["latin"] });

const TodoPageLayout = ({ children }: PropsWithChildren) => {
  const user = useUser();

  if (user.user === undefined) return <TodoPageFallback />;

  if (!user.user) {
    return <NotLoggedIn />;
  }
  return (
    <>
      <main className={raleway.className}>
        <TodoPageSidebar />
        {children}
      </main>
    </>
  );
};
export default TodoPageLayout;
