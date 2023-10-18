import React, { type PropsWithChildren } from "react";
import TodoPageSidebar from "./Sidebar";
import { Raleway } from "next/font/google";
import { useUser } from "@clerk/nextjs";
import NotLoggedIn from "./NotLoggedIn";

const raleway = Raleway({ subsets: ["latin"] });

const TodoPageLayout = ({ children }: PropsWithChildren) => {
  const user = useUser();
  if (user.user === undefined) return <p>Loading...</p>;

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
