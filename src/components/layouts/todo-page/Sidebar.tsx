import ModeToggle from "@/components/ModeToggle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  FolderHeart,
  ListTodo,
  Loader,
  MenuIcon,
  PieChart,
  Tags,
} from "lucide-react";
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

  //TODO: To-Do eklenirken markdown desteği eklenecek.

  const menus = [
    {
      name: "DASHBOARD",
      icon: <PieChart className="-mb-10" />,
      link: "/dashboard",
    },
    {
      name: "TO-DO",
      icon: <ListTodo className="-mb-10" />,
      link: "/todo",
    },
    {
      name: "KATEGORİLER",
      icon: <FolderHeart className="-mb-10" />,
      link: "/kategori",
    },
    {
      name: "ETİKETLER",
      icon: <Tags className="-mb-10" />,
      link: "/etiket",
    },
  ];
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
        className={`fixed -top-1 left-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-slate-900 sm:translate-x-0 ${
          mobile ? "translate-x-0" : ""
        }`}
      >
        {" "}
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-slate-900">
          {menus.map((menu, index) => (
            <Accordion key={index} type="single" className="mt-4">
              <AccordionItem value={`item-${index}`}>
                {menu.icon}
                <AccordionTrigger
                  isChevronOpen={false}
                  className={`ml-10 text-lg font-semibold tracking-tight ${
                    pathname === menu.link
                      ? "text-purple-500 dark:text-purple-400"
                      : "text-gray-500 dark:text-gray-200"
                  }`}
                  onClick={() => void router.push(menu.link)}
                >
                  {menu.name}
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </aside>
    </>
  );
}
