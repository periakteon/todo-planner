import { api } from "@/utils/api";
import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { type MyAppProps } from "@/components/layouts/types";
import { Layouts } from "@/components/layouts/Layouts";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Toaster } from "@/components/ui/toaster";

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page) => page);
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <NextNProgress
          color="#9333ea"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{ easing: "ease", speed: 300 }}
        />
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
