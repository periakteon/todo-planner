import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { type MyAppProps } from "@/components/layouts/types";
import { Layouts } from "@/components/layouts/Layouts";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page) => page);
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextNProgress
          color="#17b019"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{ easing: "ease", speed: 300 }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
