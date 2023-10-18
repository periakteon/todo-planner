import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function LandingPageNavbar() {
  const [mobile, setMobile] = useState(false);
  const user = useUser();
  const theme = useTheme();
  const { resolvedTheme } = theme;

  const menus = [
    { title: "Home", path: "/" },
    { title: "Todo Page", path: "/home" },
  ];
  1;

  return (
    <nav className="w-full border-b-4 border-purple-700 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <h1 className={`text-3xl font-bold text-purple-600`}>TODO:APP</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none hover:bg-gray-100 focus:border focus:border-gray-400 dark:hover:bg-gray-800"
              onClick={() => setMobile(!mobile)}
            >
              <Menu color={`${resolvedTheme === "dark" ? "white" : "black"}`} />
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
            mobile ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="font-medium text-slate-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500"
              >
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <ModeToggle />
            {user.user === undefined && <p>Loading...</p>}
            <div>
              {!user.user ? (
                <SignInButton mode="modal">
                  <Button variant={"purple"}>Giriş Yap</Button>
                </SignInButton>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
