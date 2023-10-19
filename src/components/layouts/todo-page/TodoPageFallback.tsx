import React from "react";

export default function TodoPageFallback() {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <span className="mr-3 h-12 w-[250px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600" />
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div className="mr-3 h-6 w-[120px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="mt-4 space-y-2 font-medium">
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-gray-200 dark:bg-slate-600"></div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex min-h-screen animate-pulse items-center justify-center bg-gray-100 dark:bg-slate-600"></div>
    </>
  );
}
