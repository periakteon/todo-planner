import React, { type PropsWithChildren } from "react";
import LandingPageNavbar from "./Navbar";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

const LandingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className={raleway.className}>
        <LandingPageNavbar />
        {children}
      </main>
    </>
  );
};
export default LandingPageLayout;
