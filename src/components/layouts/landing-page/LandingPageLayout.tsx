import React, { type PropsWithChildren } from "react";
import LandingPageNavbar from "./Navbar";
import { Raleway } from "next/font/google";
import Footer from "./Footer";

const raleway = Raleway({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className={raleway.className}>
        <LandingPageNavbar />
        {children}
        <Footer />
      </main>
    </>
  );
};
export default LandingPageLayout;
