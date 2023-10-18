import React, { type PropsWithChildren } from "react";
import TodoPageSidebar from "./Sidebar";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

const TodoPageLayout = ({ children }: PropsWithChildren) => {
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
