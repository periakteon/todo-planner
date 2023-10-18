import { useRouter } from "next/router";

export default function LandingPageNavbar() {
  const router = useRouter();
  const { pathname: path } = router;

  return (
    <>
      <div className="">
        <span>Navbar: {path}</span>
      </div>
    </>
  );
}
