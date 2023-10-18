import { getYear } from "date-fns";
import { Github, ListTodo, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="rounded-lg bg-white shadow dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center hover:opacity-90 sm:mb-0"
          >
            <ListTodo className="mr-2 inline" size={32} />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              TODO:APP
            </span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <Link
                href="https://github.com/periakteon"
                className="mr-4 hover:underline md:mr-6 "
              >
                <Github className="mr-1 inline" size={16} />
                GitHub
              </Link>
              <Link
                href="mailto:masumgokyuz@gmail.com"
                className="mr-4 hover:underline md:mr-6 "
              >
                <Mail className="mr-1 inline" size={16} />
                E-posta
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          {getYear(date)}{" "}
          <Link href="https://periakteon.me/" className="hover:underline">
            Masum Gökyüz
          </Link>
          . Tüm hakları saklıdır.
        </span>
      </div>
    </footer>
  );
}
