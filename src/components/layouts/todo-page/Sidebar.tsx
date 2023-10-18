import ModeToggle from "@/components/ModeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Home, ListTodo, Loader, MenuIcon, ScrollText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function TodoPageSidebar() {
  const [mobile, setMobile] = useState(false);
  const user = useUser();
  const router = useRouter();
  const { pathname } = router;
  const { resolvedTheme } = useTheme();

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900`}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Button className="inline-flex items-center rounded-lg bg-primary-foreground p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-primary-foreground dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
                <MenuIcon className="" onClick={() => setMobile(!mobile)} />
              </Button>
              <Link href="/">
                <h1
                  className={`ml-2 text-3xl font-bold ${
                    resolvedTheme === "dark"
                      ? "text-purple-500"
                      : "text-purple-600"
                  }`}
                >
                  <ListTodo className="mb-1 mr-2 hidden sm:inline" size={32} />
                  TODO:APP
                </h1>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div className="mr-6 flex h-8 w-8 flex-row rounded-full">
                  <div>
                    {user?.isSignedIn ? (
                      <UserButton />
                    ) : (
                      <Loader className="animate-spin" />
                    )}
                  </div>
                </div>
                <div className="mr-4">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        className={`fixed left-0 top-4 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-slate-900 sm:translate-x-0 ${
          mobile ? "translate-x-0" : ""
        }`}
      >
        {" "}
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-slate-900">
          <Accordion type="single" className="mt-4">
            <AccordionItem value="item-1">
              <Home className="-mb-10" />
              <AccordionTrigger
                isChevronOpen={false}
                className="ml-10 text-lg font-semibold tracking-tight"
                onClick={() => void router.push("/home")}
              >
                ANASAYFA
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <ListTodo className="-mb-10" />
              <AccordionTrigger
                isChevronOpen={true}
                className="ml-10 text-lg font-semibold tracking-tight"
              >
                TO-DO
              </AccordionTrigger>
              <AccordionContent className="">
                <Link
                  href="/todo/liste"
                  className={cn(
                    "block",
                    "w-full",
                    "justify-start",
                    buttonVariants({ variant: "ghost" }),
                    pathname === "/todo/liste"
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                  )}
                >
                  <ScrollText
                    color={resolvedTheme === "dark" ? "#a85ced" : "#9333EA"}
                    size={20}
                    className="mr-2"
                  />
                  To-Do Listesi
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>
    </>
  );
}
